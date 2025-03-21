
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [liveSurveys, setLiveSurveys] = useState([]);
  const [userInitial, setUserInitial] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

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
  }, []);

  // Fetch live surveys and generate notifications
  const fetchLiveSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/surveysuser", {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        setLiveSurveys(response.data);
        generateNotifications(response.data);
      }
    } catch (error) {
      console.error("Error fetching live surveys:", error);
    }
  };

  // Generate notifications and load read status from localStorage
  const generateNotifications = (surveys) => {
    const storedReadStatus = JSON.parse(localStorage.getItem("notificationReadStatus")) || {};
    const newNotifications = surveys.map((survey) => {
      const endDate = new Date(survey.end_date);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      const senderName = survey.staff_email.split(".")[0];
      return {
        id: survey.survey_id,
        message: daysLeft > 0 ? `Survey "${survey.survey_title}" live for you to attend now` : `Today is the last day to attend "${survey.survey_title}"`,
        timestamp: new Date(),
        read: storedReadStatus[survey.survey_id] || false, // Load read status from localStorage
        sender: senderName,
      };
    });
    setNotifications(newNotifications);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handle notification click to open the popover
  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the notification popover
  const handleCloseNotifications = () => {
    setAnchorEl(null);
  };

  // Mark all notifications as read and save the status in localStorage
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updatedNotifications);

    // Save read status in localStorage
    const readStatus = {};
    updatedNotifications.forEach((n) => (readStatus[n.id] = true));
    localStorage.setItem("notificationReadStatus", JSON.stringify(readStatus));
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;

  // Sidebar component
  const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const isMobile = useMediaQuery("(max-width:320px)");

    useEffect(() => {
      if (isMobile) {
        setOpen(false);
      }
    }, [isMobile]);

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: open ? 240 : 60, transition: "0.3s ease-in-out" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: open ? "space-between" : "center", p: 2 }}>
          {open && <Typography sx={{ color: "#6A5ACD", fontWeight: "bold", fontSize: "1.2rem" }}>BIT SURVEY</Typography>}
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
        </List>
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Divider />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Log out" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    );
  };

  const isMobile = useMediaQuery("(max-width:320px)");

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
            width: `calc(100% - ${open ? 240 : 60}px)`,
            ml: open ? `${240}px` : `${60}px`,
            transition: "0.3s ease-in-out",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {!isMobile && (
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Dashboard
              </Typography>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            </Box>
          </Toolbar>
        </AppBar>

        {/* Notification Popover */}
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
          <Paper sx={{ width: 360, p: 2 }}>
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
                      primary={notification.message}
                      secondary={`${Math.floor((new Date() - new Date(notification.timestamp)) / 3600000)} hours ago`}
                    />
                    {!notification.read && (
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "primary.main", ml: 1 }} />
                    )}
                  </ListItem>
                  <Divider /> {/* Add a divider after each message */}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Popover>

        {/* Main Content */}
        <Box sx={{ mt: 8, p: 3 }}>
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

          {/* Live Surveys */}
          {tabIndex === 0 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Live Surveys
              </Typography>
              <Grid container spacing={3}>
                {liveSurveys.map((survey, index) => {
                  const startDateISO = new Date(survey.start_date).toISOString().split("T")[0];
                  const endDateISO = new Date(survey.end_date).toISOString().split("T")[0];
                  const today = new Date().toISOString().split("T")[0];
                  const startDate = new Date(startDateISO);
                  const endDate = new Date(endDateISO);
                  const currentDate = new Date(today);
                  const timeDifference = endDate - currentDate;
                  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

                  return (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ bgcolor: "#F5F8FE", height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "bold",
                              fontSize: "14px",
                              color: "#B42318",
                              backgroundColor: "#FEF3F2",
                              borderRadius: "20px",
                              padding: "4px 12px",
                              display: "inline-block",
                              textAlign: "center",
                              mb: 1,
                            }}
                          >
                            {daysLeft > 0 ? `Live: ${daysLeft} days left` : "Expired"}
                          </Typography>
                          <Typography variant="h6" sx={{ color: "#27104E", fontSize: "14px", fontWeight: "bold" }}>
                            {survey.survey_title}
                          </Typography>
                          <Typography color="textSecondary" sx={{ mt: 1 }}>
                            Start Date: {startDateISO}
                          </Typography>
                          <Typography color="textSecondary" sx={{ mt: 1 }}>
                            End Date: {endDateISO}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 2,
                              ml: 25,
                              backgroundColor: "#1FC16B",
                              color: "white",
                              "&:hover": { backgroundColor: "#1FC16B" },
                            }}
                            onClick={() => {
                              console.log("Start Survey:", survey.survey_id);
                            }}
                          >
                            Start
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          {/* Completed Surveys */}
          {tabIndex === 1 && (
            <>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Completed Surveys
              </Typography>
              <Typography>No completed surveys to display.</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default User;