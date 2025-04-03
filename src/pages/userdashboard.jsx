import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  Button,
  Badge,
  Popover,
  Paper,
  ListItemAvatar,
  Chip,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

// Highlight Component
const Highlight = ({ text, searchQuery }) => {
  if (!searchQuery) return <span>{text}</span>;

  const regex = new RegExp(`(${searchQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchQuery.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: "yellow" }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [liveSurveys, setLiveSurveys] = useState([]);
  const [userInitial, setUserInitial] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [completedSurveys, setCompletedSurveys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (tabIndex === 0) {
      fetchLiveSurveys();
    }
  }, [tabIndex]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      const userName = user.name || user.email;
      if (userName) {
        setUserInitial(userName.charAt(0).toUpperCase());
      }
    }
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const fetchLiveSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(atob(token.split(".")[1]));
      const studentEmail = user.email;
  
      const response = await axios.get("http://localhost:3000/surveysuser", {
        headers: { Authorization: token },
      });
  
      if (response.status === 200) {
        const now = new Date();
        const live = response.data.filter((survey) => new Date(survey.end_date) >= now);
        const completed = response.data.filter((survey) => new Date(survey.end_date) < now);
  
        const surveysWithCounts = await Promise.all(
          live.map(async (survey) => {
            const countResponse = await axios.get("http://localhost:3000/submission-count", {
              headers: { Authorization: token },
              params: {
                survey_title: survey.survey_title,
                student_email: studentEmail
              }
            });
            return {
              ...survey,
              submissionCount: countResponse.data.count,
              responseLimit: survey.response_limit
            };
          })
        );
  
        setLiveSurveys(surveysWithCounts);
        setCompletedSurveys(completed);
        generateNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching live surveys:", error);
    }
  };

  const generateNotifications = (surveys) => {
    const storedReadStatus = JSON.parse(localStorage.getItem("notificationReadStatus")) || {};
    const newNotifications = surveys.map((survey) => {
      const endDate = new Date(survey.end_date);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      const senderName = survey.staff_email.split(".")[0];
      const isLive = today >= new Date(survey.start_date) && today <= endDate;

      return {
        id: survey.survey_id,
        message: isLive ? `Survey "${survey.survey_title}" is live for you to attend now` : `Today is the last day to attend "${survey.survey_title}"`,
        timestamp: new Date(),
        read: storedReadStatus[survey.survey_id] || false,
        sender: senderName,
      };
    });
    setNotifications(newNotifications);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updatedNotifications);

    const readStatus = {};
    updatedNotifications.forEach((n) => (readStatus[n.id] = true));
    localStorage.setItem("notificationReadStatus", JSON.stringify(readStatus));
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  const Sidebar = () => {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarOpen ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": { 
            width: sidebarOpen ? 240 : 60, 
            transition: "0.3s ease-in-out",
            boxSizing: "border-box"
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: sidebarOpen ? "space-between" : "center", p: 2 }}>
          {sidebarOpen && <Typography sx={{ color: "#6A5ACD", fontWeight: "bold", fontSize: "1.2rem" }}>BIT SURVEY</Typography>}
          <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {sidebarOpen && <ListItemText primary="Dashboard" />}
          </ListItem>
        </List>
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {sidebarOpen && <ListItemText primary="Log out" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: "auto", bgcolor: "white" }}>
        <AppBar
          position="fixed"
          color="default"
          elevation={0}
          sx={{
            bgcolor: "white",
            width: `calc(100% - ${sidebarOpen ? 240 : 60}px)`,
            ml: sidebarOpen ? `${240}px` : `${60}px`,
            transition: "0.3s ease-in-out",
          }}
        >
          <Toolbar sx={{ 
            display: "flex", 
            justifyContent: "space-between",
            flexDirection: isMobile && mobileSearchOpen ? "column" : "row",
            alignItems: isMobile && mobileSearchOpen ? "flex-start" : "center",
            py: isMobile && mobileSearchOpen ? 1 : 0,
            gap: isMobile ? 1 : 2
          }}>
            {!isMobile && (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Dashboard
              </Typography>
            )}
            
            {isMobile && !mobileSearchOpen && (
              <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                Dashboard
              </Typography>
            )}

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              width: isMobile && mobileSearchOpen ? "100%" : "auto",
              mt: isMobile && mobileSearchOpen ? 1 : 0
            }}>
              {isMobile && !mobileSearchOpen ? (
                <IconButton onClick={() => setMobileSearchOpen(true)}>
                  <SearchIcon />
                </IconButton>
              ) : (
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    width: isMobile ? "100%" : 200,
                    backgroundColor: "#F5F8FE",
                    borderRadius: "20px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                  }}
                  InputProps={{
                    endAdornment: isMobile && (
                      <IconButton onClick={() => setMobileSearchOpen(false)}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    )
                  }}
                />
              )}

              {(!isMobile || !mobileSearchOpen) && (
                <>
                  <IconButton sx={{ color: "#6A5ACD" }} onClick={handleNotificationClick}>
                    <Badge badgeContent={notifications.filter((n) => !n.read).length} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Avatar
                    sx={{ cursor: "pointer", bgcolor: "#6A5ACD" }}
                    onClick={() => navigate("/user-details")}
                  >
                    {userInitial}
                  </Avatar>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseNotifications}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Paper sx={{ width: isMobile ? "90vw" : 360, p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Inbox</Typography>
              <Chip label={`${notifications.filter((n) => !n.read).length} new`} color="primary" size="small" />
              <Button size="small" onClick={markAllAsRead}>
                Mark all as read
              </Button>
              <IconButton size="small" onClick={handleCloseNotifications}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ bgcolor: notification.read ? "inherit" : "#f0f0f0" }}>
                    <ListItemAvatar>
                      <Avatar>{notification.sender.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Highlight text={notification.message} searchQuery={searchQuery} />}
                      secondary={`${Math.floor((new Date() - new Date(notification.timestamp)) / 3600000)} hours ago`}
                    />
                    {!notification.read && (
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", ml: 1 }} />
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Popover>

        <Box sx={{ mt: 8, p: isMobile ? 1 : 3 }}>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            sx={{ mb: 3 }}
            TabIndicatorProps={{
              style: { backgroundColor: "#7F56D9" },
            }}
          >
            <Tab
              label="Live"
              sx={{
                color: tabIndex === 0 ? "#7F56D9" : "inherit",
                "&.Mui-selected": { color: "#7F56D9" },
                "&:focus": { outline: "none" },
              }}
            />
            <Tab
              label="Completed"
              sx={{
                color: tabIndex === 1 ? "#7F56D9" : "inherit",
                "&.Mui-selected": { color: "#7F56D9" },
                "&:focus": { outline: "none" },
              }}
            />
          </Tabs>

          {tabIndex === 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Live Surveys
              </Typography>
              <Grid container spacing={3}>
                {liveSurveys.map((survey, index) => {
                  const startDate = new Date(survey.start_date);
                  const endDate = new Date(survey.end_date);
                  const currentDate = new Date();
                  const timeDifference = endDate - currentDate;
                  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                  const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                  const isLive = currentDate >= startDate && currentDate <= endDate;
                  const statusColor = isLive ? "#B42318" : "#808080";
                  const statusBgColor = isLive ? "#FEF3F2" : "#F0F0F0";
                  const canResubmit = survey.submissionCount < survey.responseLimit;
                  const isDisabled = survey.submissionCount >= survey.responseLimit;

                  return (
                    <Grid item xs={12} md={4} key={index}>
                      <Card sx={{ 
                        bgcolor: "#F5F8FE", 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column",
                        position: "relative",
                        minHeight: "250px"
                      }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: statusColor,
                              backgroundColor: statusBgColor,
                              borderRadius: "20px",
                              padding: "4px 12px",
                              display: "inline-block",
                              textAlign: "center",
                              mb: 1,
                            }}
                          >
                            {isLive
                              ? `Live: ${daysLeft}d ${hoursLeft}h ${minutesLeft}m left`
                              : `Expired`}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "#27104E", fontSize: "14px", fontWeight: "bold" }}>
                            <Highlight text={survey.survey_title} searchQuery={searchQuery} />
                          </Typography>
                          <Typography color="textSecondary" sx={{ mt: 1 }}>
                            Start Date: {startDate.toLocaleString()}
                          </Typography>
                          <Typography color="textSecondary" sx={{ mt: 1 }}>
                            End Date: {endDate.toLocaleString()}
                          </Typography>
                          <Typography color="textSecondary" sx={{ mt: 1 }}>
                            Submissions: {survey.submissionCount}/{survey.responseLimit}
                          </Typography>
                        </CardContent>
                        <Box sx={{
                          position: "absolute",
                          bottom: 16,
                          right: 16
                        }}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: isDisabled ? "#808080" : "#1FC16B",
                              color: "white",
                              "&:hover": { backgroundColor: isDisabled ? "#808080" : "#1FC16B" },
                            }}
                            onClick={() => {
                              if (isDisabled) {
                                alert('You have reached the maximum submission limit. To edit your response, please contact the survey creator.');
                              } else {
                                navigate(`/surveyquestions/${survey.survey_title}`, { 
                                  state: { 
                                    canResubmit,
                                    submissionCount: survey.submissionCount 
                                  } 
                                });
                              }
                            }}
                            disabled={isDisabled}
                          >
                            {survey.submissionCount === 0 ? 'Start' : 
                             canResubmit ? 'Resubmit' : 'Already Submitted'}
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          {tabIndex === 1 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Completed Surveys
              </Typography>
              <Grid container spacing={3}>
                {completedSurveys.map((survey, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        bgcolor: "#F5F8FE",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        minHeight: "250px"
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#808080",
                            backgroundColor: "#F0F0F0",
                            borderRadius: "20px",
                            padding: "4px 12px",
                            display: "inline-block",
                            textAlign: "center",
                            mb: 1,
                            border: "2px solid #1FC16B",
                          }}
                        >
                          Completed
                        </Typography>
                        <Typography variant="h6" sx={{ color: "#27104E", fontSize: "14px", fontWeight: "bold" }}>
                          <Highlight text={survey.survey_title} searchQuery={searchQuery} />
                        </Typography>
                        <Typography color="textSecondary" sx={{ mt: 1 }}>
                          Start Date: {new Date(survey.start_date).toLocaleString()}
                        </Typography>
                        <Typography color="textSecondary" sx={{ mt: 1 }}>
                          End Date: {new Date(survey.end_date).toLocaleString()}
                        </Typography>
                      </CardContent>
                      <Box sx={{
                        position: "absolute",
                        bottom: 16,
                        right: 16
                      }}>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#1FC16B",
                            color: "white",
                            "&:hover": { backgroundColor: "#1FC16B" },
                          }}
                          onClick={() => {
                            console.log("View Survey:", survey.survey_id);
                          }}
                        >
                          View
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default User;