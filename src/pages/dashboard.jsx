import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, Box, CssBaseline, IconButton, InputBase, LinearProgress, AvatarGroup,
  Avatar, Button, useMediaQuery, useTheme, Grid, Card, CardContent, Modal,
  TextField, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateSurveyImage from "../assets/create_survey.png";
import TemplateImage from "../assets/templates.png";
import CloseIcon from "@mui/icons-material/Close";
import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import skillImage from "../assets/image.png";
import RPImage from "../assets/rp.png";
import contactImage from "../assets/contact.png";
import user1 from "../assets/a.png";
import user2 from "../assets/m.png";
import user3 from "../assets/d.png";
import PLUSICON from "../assets/PLUS.png";
import Logo from "../assets/logo (1).png";

const desktopDrawerWidth = 220;
const primaryColor200 = "#7B3DFF";

const DashboardCreated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Live");
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [showConditions, setShowConditions] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [showRPInput, setShowRPInput] = useState(false);
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [constraints, setConstraints] = useState({});
  const [students, setStudents] = useState([]);
  const [openResultsModal, setOpenResultsModal] = useState(false);
  const [surveys, setSurveys] = useState([]);

  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const categorizeSurvey = (survey) => {
//     const currentDateTime = new Date(); // Get current system time
  
//     if (!survey.start_date || !survey.start_time || !survey.end_date || !survey.end_time) {
//       console.error("❌ Missing or invalid date/time values:", survey);
//       return "Invalid Data";
//     }
//     console.log("title:",survey.survey_title);
//     // Extract YYYY-MM-DD from ISO 8601 formatted date (2025-03-09T18:30:00.000Z → 2025-03-09)
//     const startDateISO = survey.start_date.split("T")[0]; 
//     console.log("startDateISO-startDate:",startDateISO);
//     const endDateISO = survey.end_date.split("T")[0]; 
//     console.log("endDateISO-end Date:",endDateISO);
//     const time1 = survey?.start_time ?? "00:00:00"; // Default to "00:00:00" if undefined
//     const time2 = survey?.end_time ?? "23:59:59"; // Default to "23:59:59" if undefined
//     console.log("start time:",time1);
//     console.log("end time:",time2);
//     const currentDate = new Date().toISOString().split("T")[0]; 
//     console.log("Current Date:", currentDate);
//     const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
//     console.log("Current Time:", currentTime);
// if(startDateISO===endDateISO&&startDateISO<currentDate)
//    {
//         console.log("c1");
//         return "Completed";
//       }
// if(startDateISO===endDateISO) 
//   {
//     if(time1==currentTime) 
//       {
//         console.log("hiiii---1");
//         return "Live";
//       }
//     if(time2>currentTime)return "Scheduled";
//     if(time1<=currentTime)
//       {
//         console.log("hiiii----2");
//         return "Live";
//       }
//     if(time2<currentTime)
//       {
//         console.log("c1");
//         return "Completed";
//       }


//   }
// if(currentDate<startDateISO) return "Scheduled";
// if(endDateISO<currentDate&&endDateISO!=currentDate) 
// {
//   {
//     console.log("c2");
//     return "Completed";
//   }
// }
// if(currentDate>=startDateISO && currentDate<=endDateISO)
//   {
//     console.log("hiiii-----3");
//     return "Live";
//   }
// };
  
const categorizeSurvey = (survey) => {
  const currentDateTime = new Date(); // Get current system time

  if (!survey.start_date || !survey.start_time || !survey.end_date || !survey.end_time) {
    console.error("❌ Missing or invalid date/time values:", survey);
    return "Invalid Data";
  }
  console.log("title:",survey.survey_title);
  console.log(survey.start_date);
  console.log(survey.end_date);
  // Extract YYYY-MM-DD from ISO 8601 formatted date
  const utcDate =survey.start_date 
const startDateISO = new Date(utcDate).toLocaleDateString('en-CA'); // Converts to YYYY-MM-DD
console.log("startDateISO-startDate:",startDateISO);

  // const startDateISO = survey.start_date.split("T")[0];
  // console.log("startDateISO-startDate:",startDateISO);
  const utcDate2 =survey.end_date 
  const endDateISO = new Date(utcDate2).toLocaleDateString('en-CA'); // Converts to YYYY-MM-DD
  console.log("endDateISO-endDate:",endDateISO);
  
  // Extract times (assuming times are in HH:MM:SS format)
  const startTime = survey.start_time || "00:00:00";
  console.log("start time:",startTime);
  const endTime = survey.end_time || "23:59:59";
  console.log("end time:",endTime);

  // Get current date and time in YYYY-MM-DD and HH:MM:SS format
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
  
  console.log("Current Date:", currentDate);
  console.log("Current Time:", currentTime);

  // Case 1: Survey has ended (current date > end date)
  if (currentDate > endDateISO) {
    console.log("1");
    return "Completed";
  }

  // Case 2: Survey is in the future (current date < start date)
  if (currentDate < startDateISO) {
    console.log("2");
    return "Scheduled";
  }

  // Case 3: Survey is ongoing (current date === start date === end date)
  if (startDateISO === endDateISO) {
    if (currentTime >= startTime && currentTime <= endTime) {
      console.log("3");
      return "Live";
    } else if (currentTime > endTime) {
      console.log("4");
      return "Completed";
    } else {
      console.log("5");
      return "Scheduled";
    }
  }

  // Case 4: Survey spans multiple days (start date < end date)
  if (currentDate >= startDateISO && currentDate <= endDateISO) {
    console.log("6");
    return "Live";
  }

  // Default case
  return "Invalid Data";
};
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "My surveys", icon: <DescriptionIcon />, path: "/survey" },
    { text: "Mentoring", icon: <GroupIcon />, path: "/mentor" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleOpenGroupModal = () => {
    setOpenGroupModal(true);
    setShowConditions(false);
  };

  const handleCloseGroupModal = () => {
    setOpenGroupModal(false);
  };

  const handleSetConditions = () => {
    setShowConditions(true);
  };

  const handleSkillBoxClick = () => {
    setShowSkills(true);
    setShowRPInput(false);
    setShowRoleDropdown(false);
  };

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleLevelClick = (level) => {
    const combinedSkillLevel = `${selectedSkill} ${level}`;
    if (selectedLevels.includes(combinedSkillLevel)) {
      setSelectedLevels(selectedLevels.filter((item) => item !== combinedSkillLevel));
    } else {
      setSelectedLevels([...selectedLevels, combinedSkillLevel]);
    }
  };

  const handleDeselectAll = () => {
    setSelectedLevels([]);
  };

  const handleRPBoxClick = () => {
    setShowRPInput(true);
    setShowSkills(false);
    setShowRoleDropdown(false);
  };

  const handleRoleBoxClick = () => {
    setShowRoleDropdown(true);
    setShowSkills(false);
    setShowRPInput(false);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleConstraintChange = (level, value) => {
    setConstraints({
      ...constraints,
      [level]: value,
    });
  };

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Filter students based on selected dropdown values
  const filteredStudents = students.filter(
    (student) =>
      (!selectedYear || student.Year === selectedYear) &&
      (!selectedDepartment || student.Department === selectedDepartment)
  );

  useEffect(() => {
    if (selectedOption === "Live") {
      fetchSurveys();
    } else if (selectedOption === "Completed") {
      fetchCompletedSurveys();
    } else if (selectedOption === "Scheduled") {
      fetchScheduledSurveys();
    } else if (selectedOption === "All surveys") {
      fetchAllSurveys();
    }
  }, [selectedOption]);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/get-surveys", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurveys(data); // Set the fetched surveys to state
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };
  const handleSeeResults = async () => {
    try {
      const requestBody = { selectedLevels, selectedRole, startRange, endRange };
      console.log("Sending request body:", requestBody);

      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received from API:", data);
      setStudents(data);
      setOpenResultsModal(true); // Open the results modal
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const fetchCompletedSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/get-completed-surveys", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error("Error fetching completed surveys:", error);
    }
  };

  const fetchScheduledSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/get-scheduled-surveys", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurveys(data);
    } catch (error) {
      console.error("Error fetching scheduled surveys:", error);
    }
  };

  const fetchAllSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const [liveSurveys, completedSurveys, scheduledSurveys] = await Promise.all([
        fetch("http://localhost:3000/get-surveys", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }).then((res) => res.json()),
        fetch("http://localhost:3000/get-completed-surveys", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }).then((res) => res.json()),
        fetch("http://localhost:3000/get-scheduled-surveys", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }).then((res) => res.json()),
      ]);

      // Merge all surveys into one array
      const allSurveys = [...liveSurveys, ...completedSurveys, ...scheduledSurveys];

      // Remove duplicates based on survey_title
      const uniqueSurveys = allSurveys.reduce((acc, survey) => {
        if (!acc.find((s) => s.survey_title === survey.survey_title)) {
          acc.push(survey);
        }
        return acc;
      }, []);

      setSurveys(uniqueSurveys);
    } catch (error) {
      console.error("Error fetching all surveys:", error);
    }
  };

  const handleCloseResultsModal = () => {
    setOpenResultsModal(false);
  };

  const getLevelButtons = (skill) => {
    switch (skill) {
      case "C PROGRAMMING":
        return ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7"];
      case "PYTHON":
        return ["Level1", "Level2", "Level3", "Level4"];
      case "SQL":
        return ["Level1"];
      case "PROBLEM SOLVING":
        return ["Level1", "Level2"];
      case "JAVA":
        return ["Level1", "Level2", "Level3"];
      case "UIUX":
        return ["Level1", "Level2", "Level3"];
      case "APTITUDE":
        return ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6"];
      default:
        return [];
    }
  };

  const drawer = (
    <Box sx={{ height: "100vh", background: "#fff", color: "#000", p: 2 }}>
     <Typography
  variant="h6"
  sx={{ fontWeight: "bold", color: primaryColor200, mb: 2, fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center" }}
>
  <img
    src={Logo}
    alt="Logo"
    style={{ width: "20px", height: "19px", marginRight: "8px" }} // Add margin to the right of the image
  />
  BIT SURVEY
</Typography>

      <List>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderLeft: isActive ? `8px solid ${primaryColor200}` : "none",
                  ml: isActive ? "-14px" : "0",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: "black" }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box sx={{ position: "absolute", bottom: 20, left: 16 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "grey" }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", backgroundColor: "#fff" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "#fff",
          color: "#000",
          width: { sm: `calc(100% - ${desktopDrawerWidth}px)` },
          ml: { sm: `${desktopDrawerWidth}px` },
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "16px", sm: "27px" } }}>
              Dashboard
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f1f1f1",
              borderRadius: "20px",
              padding: "4px 10px",
              width: { xs: "140px", sm: "250px" },
              boxShadow: "none",
              ml: "auto",
            }}
          >
            <SearchIcon sx={{ color: "gray", mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ flex: 1, fontSize: "14px" }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.8, sm: 2 } }}>
            <IconButton sx={{ backgroundColor: "#F5F6FA", p: 1 }}>
              <SettingsIcon sx={{ color: "#7A7A7A", fontSize: { xs: "10px", sm: "24px" } }} />
            </IconButton>

            <IconButton sx={{ backgroundColor: "#F5F6FA", p: 1 }}>
              <NotificationsIcon sx={{ color: "#7A7A7A", fontSize: { xs: "10px", sm: "24px" } }} />
            </IconButton>

            <Avatar src="/assets/prof.png" sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: desktopDrawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { width: desktopDrawerWidth, boxSizing: "border-box" },
          ...(isMobile && { display: "block" }),
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${desktopDrawerWidth}px)` },
          marginTop: "64px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { boxShadow: 3 },
              }}
              onClick={() => handleNavigation("/create-survey")}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={CreateSurveyImage}
                    alt="Create Survey"
                    style={{ width: "auto", height: "70px" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Create Survey
                    <br />
                    <span style={{ fontSize: "0.875rem", color: "grey" }}>
                      Explore new paths
                    </span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { boxShadow: 3 },
              }}
              onClick={() => handleNavigation("/templates")}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={TemplateImage}
                    alt="Templates"
                    style={{ width: "auto", height: "70px" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Templates
                    <br />
                    <span style={{ fontSize: "0.875rem", color: "grey" }}>
                      Create from existing
                    </span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": { boxShadow: 3 },
              }}
              onClick={handleOpenGroupModal}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={CreateSurveyImage}
                    alt="Create Groups"
                    style={{ width: "auto", height: "70px" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    Create Groups
                    <br />
                    <span style={{ fontSize: "0.875rem", color: "grey" }}>
                      Add members
                    </span>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
          {["Live", "Scheduled", "Draft", "All surveys", "Completed", "Group surveys"].map((option) => (
            <Button
              key={option}
              onClick={() => handleOptionClick(option)}
              disableRipple
              sx={{
                textTransform: "none",
                color: selectedOption === option ? primaryColor200 : "text.secondary",
                borderBottom: selectedOption === option ? `2px solid ${primaryColor200}` : "none",
                borderRadius: 0,
                padding: 0,
                minWidth: "auto",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active": {
                  backgroundColor: "transparent",
                },
                "&:focus": {
                  outline: "none",
                },
                "&:focus-visible": {
                  outline: "none",
                },
              }}
            >
              {option}
            </Button>
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          {(selectedOption === "Live" || selectedOption === "Completed" || selectedOption === "Scheduled" || selectedOption === "All surveys") && (
            <Grid container spacing={2}>
              {surveys.map((survey, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#F5F8FE",
                      cursor: "pointer",
                      "&:hover": { boxShadow: 3 },
                      borderRadius: "10px",
                      position: "relative", // Ensures proper positioning of the status label
                    }}
                  >
                    <CardContent>
                      {/* Start Date */}
                      <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", color: "#4A4A4A" }}>
                        {new Date(survey.start_date).toISOString().split("T")[0]}
                      </Typography>

                      {/* Survey Title */}
                      <Typography variant="h6" gutterBottom sx={{ fontSize: "14px", color: "#27104E", fontWeight: 600 }}>
                        {survey.survey_title}
                      </Typography>

                      {/* Faculty Name (Extracted from Email) */}
                      <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", color: "#27104E" }}>
                        {survey.staff_email.split(".")[0].toUpperCase()}
                      </Typography>

                      {/* Progress Bar */}
                      <Box sx={{ mt: 1, width: "100%" }}>
                        <LinearProgress
                          variant="determinate"
                          value={categorizeSurvey(survey) === "Completed" ? 100 : 0}
                          sx={{ height: 6, borderRadius: 3, backgroundColor: "#E0E0E0", "& .MuiLinearProgress-bar": { backgroundColor: "#1FC16B" } }}
                        />
                      </Box>

                      {/* Progress Text */}
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: 1 }}>
                        <Typography variant="body2" sx={{ color: "#27104E", fontSize: "12px" }}>
                          Progress
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#27104E", fontSize: "12px" }}>
                          {categorizeSurvey(survey) === "Completed" ? "100%" : "0%"}
                        </Typography>
                      </Box>
                      {(categorizeSurvey(survey) === "Completed" || categorizeSurvey(survey) === "Scheduled") && <br />}

                      {/* ✅ Show AvatarGroup ONLY for Live Surveys */}
                      {categorizeSurvey(survey) === "Live" && (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 12 } }}>
                              <Avatar alt="User 1" src={user1} />
                              <Avatar alt="User 2" src={user2} />
                              <Avatar alt="User 3" src={user3} />
                              <Avatar alt="User 4" src={PLUSICON} />
                            </AvatarGroup>
                            <Typography variant="body2" sx={{ color: "#E26001", fontWeight: "bold", ml: 1, fontSize: "12px" }}>
                              + responses
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </CardContent>

                    {/* 📌 Status Label Positioned at Bottom Right */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        border: "1px solid",
                        borderColor: categorizeSurvey(survey) === "Live" ? "#E26001" : categorizeSurvey(survey) === "Completed" ? "#1FC16B" : "#C13B06",
                        borderRadius: "16px",
                        padding: "2px 8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        minWidth: "auto",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#5A5A5A",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {categorizeSurvey(survey) === "Live" ? "In Live" : categorizeSurvey(survey)}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {selectedOption === "Draft" && <Typography>Draft surveys will be displayed here.</Typography>}
          {selectedOption === "All surveys" && <Typography>All surveys will be displayed here.</Typography>}
          {selectedOption === "Group surveys" && <Typography>Group surveys will be displayed here.</Typography>}
        </Box>
      </Box>
      <Modal
        open={openGroupModal}
        onClose={handleCloseGroupModal}
        aria-labelledby="group-creation-modal"
        aria-describedby="group-creation-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "8px",
          width: "650px",
          height: "530px",
          textAlign: "left",
          position: "relative",
        }}>
          <IconButton
            onClick={handleCloseGroupModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>

          {!showConditions ? (
            <>
              <Typography
                id="group-creation-modal"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Group creation
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  width: "100%",
                  height: "80px",
                  marginTop: "20px",
                }}
              >
                <Box
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "absolute",
                    left: "30%",
                    zIndex: 1,
                    border: "2px solid white",
                  }}
                >
                  <img
                    src={profile1}
                    alt="Profile 1"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    border: "2px solid white",
                  }}
                >
                  <img
                    src={profile2}
                    alt="Profile 2"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "absolute",
                    right: "30%",
                    zIndex: 1,
                    border: "2px solid white",
                  }}
                >
                  <img
                    src={profile3}
                    alt="Profile 3"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              </Box>

              <Typography sx={{ mt: 10, textAlign: "center", color: "grey" }}>
                You wanna create a new group! Add members to <br />contribute to your survey.
              </Typography>

              <Box sx={{ mt: 4, ml: 28 }}>
                <Button
                  variant="contained"
                  onClick={handleSetConditions}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#7B61FF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    height: "32px",
                  }}
                >
                  Set Conditions
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                id="group-creation-modal"
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Set Conditions
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                  ml: "10px",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    textAlign: "center",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                  onClick={handleSkillBoxClick}
                >
                  <img
                    src={skillImage}
                    alt="Skill"
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                  />
                  <Typography>Skill</Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    textAlign: "center",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                  onClick={handleRPBoxClick}
                >
                  <img
                    src={RPImage}
                    alt="RP"
                    style={{ width: "40px", height: "28px", borderRadius: "50%" }}
                  />
                  <Typography>RP</Typography>
                </Box>

                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    textAlign: "center",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                  onClick={handleRoleBoxClick}
                >
                  <img
                    src={contactImage}
                    alt="Role"
                    style={{ width: "40px", height: "30px", borderRadius: "50%" }}
                  />
                  <Typography>Role</Typography>
                </Box>
              </Box>

              {showSkills && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 2,
                    ml: "10px",
                  }}
                >
                  {["C PROGRAMMING", "PYTHON", "SQL", "PROBLEM SOLVING", "JAVA", "UIUX", "APTITUDE"].map((skill, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => handleSkillClick(skill)}
                      sx={{
                        textTransform: "none",
                        backgroundColor: selectedSkill === skill ? "#6A50E0" : "rgb(226, 222, 248)",
                        color: selectedSkill === skill ? "white" : "black",
                        borderRadius: "20px",
                        border: "2px solid #6A50E0",
                        padding: "2px 8px",
                        fontSize: "0.7rem",
                        height: "24px",
                        "&:hover": {
                          backgroundColor: "#6A50E0",
                          borderColor: "#6A50E0",
                        },
                      }}
                    >
                      {skill}
                    </Button>
                  ))}
                </Box>
              )}

              {selectedSkill && showSkills && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 2,
                    ml: "10px",
                  }}
                >
                  {getLevelButtons(selectedSkill).map((level, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => handleLevelClick(level)}
                      sx={{
                        textTransform: "none",
                        backgroundColor: selectedLevels.includes(`${selectedSkill} ${level}`) ? "#6A50E0" : "rgb(226, 222, 248)",
                        color: selectedLevels.includes(`${selectedSkill} ${level}`) ? "white" : "black",
                        borderRadius: "20px",
                        border: "2px solid #6A50E0",
                        padding: "2px 8px",
                        fontSize: "0.7rem",
                        height: "24px",
                        "&:hover": {
                          backgroundColor: "#6A50E0",
                          borderColor: "#6A50E0",
                        },
                      }}
                    >
                      {level}
                    </Button>
                  ))}
                </Box>
              )}

              {showRPInput && (
                <Box
                  sx={{
                    mt: 2,
                    ml: "10px",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <TextField
                    label="Start Range"
                    variant="outlined"
                    value={startRange}
                    onChange={(e) => setStartRange(e.target.value)}
                    sx={{ width: "150px" }}
                  />
                  <TextField
                    label="End Range"
                    variant="outlined"
                    value={endRange}
                    onChange={(e) => setEndRange(e.target.value)}
                    sx={{ width: "150px" }}
                  />
                </Box>
              )}

              {showRoleDropdown && (
                <Box
                  sx={{
                    mt: 2,
                    ml: "10px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role-select"
                      value={selectedRole}
                      label="Role"
                      onChange={handleRoleChange}
                      sx={{ width: "200px" }}
                    >
                      <MenuItem value="Faculty">Faculty</MenuItem>
                      <MenuItem value="Student">Student</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {selectedLevels.length > 0 && showSkills && (
                <Box
                  sx={{
                    mt: 2,
                    ml: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    {selectedLevels.map((level, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "rgb(226, 222, 248)",
                          color: "black",
                          borderRadius: "20px",
                          border: "2px solid #6A50E0",
                          padding: "2px 8px",
                          fontSize: "0.7rem",
                          height: "24px",
                          "&:hover": {
                            backgroundColor: "#6A50E0",
                            borderColor: "#6A50E0",
                          },
                        }}
                      >
                        {level}
                      </Button>
                    ))}
                  </Box>
                  <Button
                    onClick={handleDeselectAll}
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      color: "red",
                      fontSize: "0.7rem",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Deselect All
                  </Button>
                </Box>
              )}

              <Box sx={{ mt: 2, ml: 52 }}>
                <Button
                  variant="contained"
                  onClick={handleSeeResults}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#7B61FF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    height: "32px",
                  }}
                >
                  See Results
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Results Modal */}
      <Modal
        open={openResultsModal}
        onClose={handleCloseResultsModal}
        aria-labelledby="results-modal"
        aria-describedby="results-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "8px",
            width: "80%",
            maxWidth: "1200px",
            height: "80%",
            overflowY: "auto",
            textAlign: "left",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleCloseResultsModal}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Title */}
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
            Student Results
          </Typography>

          {/* Dropdown Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {/* Year Dropdown */}
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="1st Year">I</MenuItem>
                <MenuItem value="2nd Year">II</MenuItem>
                <MenuItem value="3rd Year">III</MenuItem>
                <MenuItem value="4th Year">IV</MenuItem>
              </Select>
            </FormControl>

            {/* Department Dropdown */}
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                displayEmpty
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="ECE">ECE</MenuItem>
                <MenuItem value="MECH">MECH</MenuItem>
                <MenuItem value="CIVIL">CIVIL</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Student Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ bgcolor: "#1976d2", color: "white" }}>
                        {student.Name.charAt(0).toUpperCase()}
                      </Avatar>
                      {student.Name}
                    </TableCell>
                    <TableCell>{student.Year}</TableCell>
                    <TableCell>{student.Email}</TableCell>
                    <TableCell>{student.Department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardCreated;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
//   AppBar, Toolbar, Typography, Box, CssBaseline, IconButton, InputBase, LinearProgress, AvatarGroup,
//   Avatar, Button, useMediaQuery, useTheme, Grid, Card, CardContent, Modal,
//   TextField, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import DescriptionIcon from "@mui/icons-material/Description";
// import GroupIcon from "@mui/icons-material/Group";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import SearchIcon from "@mui/icons-material/Search";
// import SettingsIcon from "@mui/icons-material/Settings";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CreateSurveyImage from "../assets/create_survey.png";
// import TemplateImage from "../assets/templates.png";
// import CloseIcon from "@mui/icons-material/Close";
// import profile1 from "../assets/profile1.jpg";
// import profile2 from "../assets/profile2.jpg";
// import profile3 from "../assets/profile3.jpg";
// import skillImage from "../assets/image.png";
// import RPImage from "../assets/rp.png";
// import contactImage from "../assets/contact.png";
// import user1 from "../assets/a.png";
// import user2 from "../assets/m.png";
// import user3 from "../assets/d.png";
// import PLUSICON from "../assets/PLUS.png";

// const desktopDrawerWidth = 220;
// const primaryColor200 = "#7B3DFF";

// const DashboardCreated = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("Live");
//   const [openGroupModal, setOpenGroupModal] = useState(false);
//   const [showConditions, setShowConditions] = useState(false);
//   const [showSkills, setShowSkills] = useState(false);
//   const [selectedSkill, setSelectedSkill] = useState(null);
//   const [selectedLevels, setSelectedLevels] = useState([]);
//   const [showRPInput, setShowRPInput] = useState(false);
//   const [startRange, setStartRange] = useState("");
//   const [endRange, setEndRange] = useState("");
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [constraints, setConstraints] = useState({});
//   const [students, setStudents] = useState([]);
//   const [openResultsModal, setOpenResultsModal] = useState(false);
//   const [surveys, setSurveys] = useState([]);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //   const categorizeSurvey = (survey) => {
// //     const currentDateTime = new Date(); // Get current system time
  
// //     if (!survey.start_date || !survey.start_time || !survey.end_date || !survey.end_time) {
// //       console.error("❌ Missing or invalid date/time values:", survey);
// //       return "Invalid Data";
// //     }
// //     console.log("title:",survey.survey_title);
// //     // Extract YYYY-MM-DD from ISO 8601 formatted date (2025-03-09T18:30:00.000Z → 2025-03-09)
// //     const startDateISO = survey.start_date.split("T")[0]; 
// //     console.log("startDateISO-startDate:",startDateISO);
// //     const endDateISO = survey.end_date.split("T")[0]; 
// //     console.log("endDateISO-end Date:",endDateISO);
// //     const time1 = survey?.start_time ?? "00:00:00"; // Default to "00:00:00" if undefined
// //     const time2 = survey?.end_time ?? "23:59:59"; // Default to "23:59:59" if undefined
// //     console.log("start time:",time1);
// //     console.log("end time:",time2);
// //     const currentDate = new Date().toISOString().split("T")[0]; 
// //     console.log("Current Date:", currentDate);
// //     const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
// //     console.log("Current Time:", currentTime);
// // if(startDateISO===endDateISO&&startDateISO<currentDate)
// //    {
// //         console.log("c1");
// //         return "Completed";
// //       }
// // if(startDateISO===endDateISO) 
// //   {
// //     if(time1==currentTime) 
// //       {
// //         console.log("hiiii---1");
// //         return "Live";
// //       }
// //     if(time2>currentTime)return "Scheduled";
// //     if(time1<=currentTime)
// //       {
// //         console.log("hiiii----2");
// //         return "Live";
// //       }
// //     if(time2<currentTime)
// //       {
// //         console.log("c1");
// //         return "Completed";
// //       }


// //   }
// // if(currentDate<startDateISO) return "Scheduled";
// // if(endDateISO<currentDate&&endDateISO!=currentDate) 
// // {
// //   {
// //     console.log("c2");
// //     return "Completed";
// //   }
// // }
// // if(currentDate>=startDateISO && currentDate<=endDateISO)
// //   {
// //     console.log("hiiii-----3");
// //     return "Live";
// //   }
// // };
  
// const categorizeSurvey = (survey) => {
//   const currentDateTime = new Date(); // Get current system time

//   if (!survey.start_date || !survey.start_time || !survey.end_date || !survey.end_time) {
//     console.error("❌ Missing or invalid date/time values:", survey);
//     return "Invalid Data";
//   }
//   console.log("title:",survey.survey_title);
//   // Extract YYYY-MM-DD from ISO 8601 formatted date
//   console.log("start_date:",survey.start_date);
//   console.log("start_time:",survey.start_time);
//   console.log("end_date:",survey.end_date);
//   console.log("end_time:",survey.end_time);
//   const startDateISO = survey.start_date.split("T")[0];
//   const endDateISO = survey.end_date.split("T")[0];
//   console.log("startDateISOALTER:",startDateISO);
//   console.log("endDateISOALTER:",endDateISO);

//   // Extract times (assuming times are in HH:MM:SS format)
//   const startTime = survey.start_time || "00:00:00";
//   const endTime = survey.end_time || "23:59:59";
//   console.log("start_timeALTER:",startTime);
//   console.log("end_timeALTER:",endTime);

//   // Get current date and time in YYYY-MM-DD and HH:MM:SS format
//   const currentDate = new Date().toISOString().split("T")[0];
//   const currentTime = new Date().toLocaleTimeString("en-GB", { hour12: false });
//   console.log("CURRENT_date:",currentDate);
//   console.log("CURRENT_time:",currentTime);
//   // if(startDateISO===endDateISO&&startTime<=currentTime&&endTime>=currentTime&&startDateISO===currentDate)
//   // {
//   //   console.log("checked");
//   //   return "Live";
//   // }

//   // Case 1: Survey has ended (current date > end date)
//   if (currentDate > endDateISO) {
//     console.log("c1");
//     return "Completed";
//   }

//   // Case 2: Survey is in the future (current date < start date)
//   if (currentDate < startDateISO) {
//     console.log("s1");
//     return "Scheduled";
//   }

//   // Case 3: Survey is ongoing (current date === start date === end date)
//   if (startDateISO === endDateISO) {
//     if(startDateISO!=currentDate)
//     {
//       console.log("com");
//       return "Completed"; 
//     }
//     if (currentTime >= startTime && currentTime <= endTime&&startDateISO===currentDate) {
//       console(survey.survey_title);
//       console.log("l1");
//       return "Live";
//     } else if (currentTime > endTime) {
//       console.log("c2");
//       return "Completed";
//     } else {
//       console.log("s2");
//       return "Scheduled";
//     }
//   }

//   // Case 4: Survey spans multiple days (start date < end date)
//   if (currentDate >= startDateISO && currentDate <= endDateISO) {
//     console.log("l2");
//     return "Live";
//   }

//   // Default case
//   return "Invalid Data";
// };
//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
//     { text: "My surveys", icon: <DescriptionIcon />, path: "/survey" },
//     { text: "Mentoring", icon: <GroupIcon />, path: "/mentor" },
//   ];

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   const handleOpenGroupModal = () => {
//     setOpenGroupModal(true);
//     setShowConditions(false);
//   };

//   const handleCloseGroupModal = () => {
//     setOpenGroupModal(false);
//   };

//   const handleSetConditions = () => {
//     setShowConditions(true);
//   };

//   const handleSkillBoxClick = () => {
//     setShowSkills(true);
//     setShowRPInput(false);
//     setShowRoleDropdown(false);
//   };

//   const handleSkillClick = (skill) => {
//     setSelectedSkill(skill);
//   };

//   const handleLevelClick = (level) => {
//     const combinedSkillLevel = `${selectedSkill} ${level}`;
//     if (selectedLevels.includes(combinedSkillLevel)) {
//       setSelectedLevels(selectedLevels.filter((item) => item !== combinedSkillLevel));
//     } else {
//       setSelectedLevels([...selectedLevels, combinedSkillLevel]);
//     }
//   };

//   const handleDeselectAll = () => {
//     setSelectedLevels([]);
//   };

//   const handleRPBoxClick = () => {
//     setShowRPInput(true);
//     setShowSkills(false);
//     setShowRoleDropdown(false);
//   };

//   const handleRoleBoxClick = () => {
//     setShowRoleDropdown(true);
//     setShowSkills(false);
//     setShowRPInput(false);
//   };

//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value);
//   };

//   const handleConstraintChange = (level, value) => {
//     setConstraints({
//       ...constraints,
//       [level]: value,
//     });
//   };

//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState("");

//   // Filter students based on selected dropdown values
//   const filteredStudents = students.filter(
//     (student) =>
//       (!selectedYear || student.Year === selectedYear) &&
//       (!selectedDepartment || student.Department === selectedDepartment)
//   );

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let data = [];
//         if (selectedOption === "Live") {
//           const response = await fetch("http://localhost:3000/get-surveys", {
//             method: "GET",
//             headers: {
//               Authorization: localStorage.getItem("token"),
//             },
//           });
//           data = await response.json();
//         } else if (selectedOption === "Completed") {
//           const response = await fetch("http://localhost:3000/get-completed-surveys", {
//             method: "GET",
//             headers: {
//               Authorization: localStorage.getItem("token"),
//             },
//           });
//           data = await response.json();
//         } else if (selectedOption === "Scheduled") {
//           const response = await fetch("http://localhost:3000/get-scheduled-surveys", {
//             method: "GET",
//             headers: {
//               Authorization: localStorage.getItem("token"),
//             },
//           });
//           data = await response.json();
//         } else if (selectedOption === "All surveys") {
//           // Fetch all surveys without filtering
//           const [liveSurveys, completedSurveys, scheduledSurveys] = await Promise.all([
//             fetch("http://localhost:3000/get-surveys", {
//               method: "GET",
//               headers: {
//                 Authorization: localStorage.getItem("token"),
//               },
//             }).then((res) => res.json()),
//             fetch("http://localhost:3000/get-completed-surveys", {
//               method: "GET",
//               headers: {
//                 Authorization: localStorage.getItem("token"),
//               },
//             }).then((res) => res.json()),
//             fetch("http://localhost:3000/get-scheduled-surveys", {
//               method: "GET",
//               headers: {
//                 Authorization: localStorage.getItem("token"),
//               },
//             }).then((res) => res.json()),
//           ]);
  
//           // Combine all surveys into one array
//           data = [...liveSurveys, ...completedSurveys, ...scheduledSurveys];
//         }
  
//         // Re-categorize surveys based on current date and time
//         const categorizedSurveys = data.map((survey) => ({
//           ...survey,
//           status: categorizeSurvey(survey),
//         }));
  
//         // Filter surveys based on the selected option (except for "All surveys")
//         const filteredSurveys = selectedOption === "All surveys"
//           ? categorizedSurveys
//           : categorizedSurveys.filter((survey) => survey.status === selectedOption);
  
//         setSurveys(filteredSurveys);
//       } catch (error) {
//         console.error("Error fetching surveys:", error);
//       }
//     };
  
//     fetchData();
//   }, [selectedOption]);

//   const fetchSurveys = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3000/get-surveys", {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setSurveys(data); // Set the fetched surveys to state
//     } catch (error) {
//       console.error("Error fetching surveys:", error);
//     }
//   };
//   const handleSeeResults = async () => {
//     try {
//       const requestBody = { selectedLevels, selectedRole, startRange, endRange };
//       console.log("Sending request body:", requestBody);

//       const response = await fetch('http://localhost:3000/students', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Data received from API:", data);
//       setStudents(data);
//       setOpenResultsModal(true); // Open the results modal
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };
//   const fetchCompletedSurveys = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3000/get-completed-surveys", {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setSurveys(data);
//     } catch (error) {
//       console.error("Error fetching completed surveys:", error);
//     }
//   };

//   const fetchScheduledSurveys = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3000/get-scheduled-surveys", {
//         method: "GET",
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setSurveys(data);
//     } catch (error) {
//       console.error("Error fetching scheduled surveys:", error);
//     }
//   };

//   const fetchAllSurveys = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const [liveSurveys, completedSurveys, scheduledSurveys] = await Promise.all([
//         fetch("http://localhost:3000/get-surveys", {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         }).then((res) => res.json()),
//         fetch("http://localhost:3000/get-completed-surveys", {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         }).then((res) => res.json()),
//         fetch("http://localhost:3000/get-scheduled-surveys", {
//           method: "GET",
//           headers: {
//             Authorization: token,
//           },
//         }).then((res) => res.json()),
//       ]);

//       // Merge all surveys into one array
//       const allSurveys = [...liveSurveys, ...completedSurveys, ...scheduledSurveys];

//       // Remove duplicates based on survey_title
//       const uniqueSurveys = allSurveys.reduce((acc, survey) => {
//         if (!acc.find((s) => s.survey_title === survey.survey_title)) {
//           acc.push(survey);
//         }
//         return acc;
//       }, []);

//       setSurveys(uniqueSurveys);
//     } catch (error) {
//       console.error("Error fetching all surveys:", error);
//     }
//   };

//   const handleCloseResultsModal = () => {
//     setOpenResultsModal(false);
//   };

//   const getLevelButtons = (skill) => {
//     switch (skill) {
//       case "C PROGRAMMING":
//         return ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6", "Level7"];
//       case "PYTHON":
//         return ["Level1", "Level2", "Level3", "Level4"];
//       case "SQL":
//         return ["Level1"];
//       case "PROBLEM SOLVING":
//         return ["Level1", "Level2"];
//       case "JAVA":
//         return ["Level1", "Level2", "Level3"];
//       case "UIUX":
//         return ["Level1", "Level2", "Level3"];
//       case "APTITUDE":
//         return ["Level1", "Level2", "Level3", "Level4", "Level5", "Level6"];
//       default:
//         return [];
//     }
//   };

//   const drawer = (
//     <Box sx={{ height: "100vh", background: "#fff", color: "#000", p: 2 }}>
//       <Typography
//         variant="h6"
//         sx={{ fontWeight: "bold", color: primaryColor200, mb: 2, fontFamily: "Poppins, sans-serif" }}
//       >
//         BIT SURVEY
//       </Typography>
//       <List>
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <ListItem key={index} disablePadding>
//               <ListItemButton
//                 onClick={() => navigate(item.path)}
//                 sx={{
//                   borderLeft: isActive ? `8px solid ${primaryColor200}` : "none",
//                   ml: isActive ? "-14px" : "0",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "black" }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} sx={{ color: "black" }} />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//       <Box sx={{ position: "absolute", bottom: 20, left: 16 }}>
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleLogout}>
//             <ListItemIcon sx={{ color: "grey" }}>
//               <ExitToAppIcon />
//             </ListItemIcon>
//             <ListItemText primary="Log out" />
//           </ListItemButton>
//         </ListItem>
//       </Box>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", height: "100vh", width: "100vw", backgroundColor: "#fff" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{
//           background: "#fff",
//           color: "#000",
//           width: { sm: `calc(100% - ${desktopDrawerWidth}px)` },
//           ml: { sm: `${desktopDrawerWidth}px` },
//           boxShadow: "none",
//           borderBottom: "1px solid #ddd",
//         }}
//       >
//         <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 1, display: { sm: "none" } }}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "black", fontSize: { xs: "16px", sm: "27px" } }}>
//               Dashboard
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               backgroundColor: "#f1f1f1",
//               borderRadius: "20px",
//               padding: "4px 10px",
//               width: { xs: "140px", sm: "250px" },
//               boxShadow: "none",
//               ml: "auto",
//             }}
//           >
//             <SearchIcon sx={{ color: "gray", mr: 1 }} />
//             <InputBase
//               placeholder="Search..."
//               sx={{ flex: 1, fontSize: "14px" }}
//             />
//           </Box>

//           <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.8, sm: 2 } }}>
//             <IconButton sx={{ backgroundColor: "#F5F6FA", p: 1 }}>
//               <SettingsIcon sx={{ color: "#7A7A7A", fontSize: { xs: "10px", sm: "24px" } }} />
//             </IconButton>

//             <IconButton sx={{ backgroundColor: "#F5F6FA", p: 1 }}>
//               <NotificationsIcon sx={{ color: "#7A7A7A", fontSize: { xs: "10px", sm: "24px" } }} />
//             </IconButton>

//             <Avatar src="/assets/prof.png" sx={{ width: { xs: 30, sm: 40 }, height: { xs: 30, sm: 40 } }} />
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={isMobile ? mobileOpen : true}
//         onClose={handleDrawerToggle}
//         sx={{
//           width: desktopDrawerWidth,
//           flexShrink: 0,
//           display: { xs: "none", sm: "block" },
//           "& .MuiDrawer-paper": { width: desktopDrawerWidth, boxSizing: "border-box" },
//           ...(isMobile && { display: "block" }),
//         }}
//       >
//         {drawer}
//       </Drawer>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${desktopDrawerWidth}px)` },
//           marginTop: "64px",
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 height: "100%",
//                 cursor: "pointer",
//                 "&:hover": { boxShadow: 3 },
//               }}
//               onClick={() => handleNavigation("/create-survey")}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <img
//                     src={CreateSurveyImage}
//                     alt="Create Survey"
//                     style={{ width: "auto", height: "70px" }}
//                   />
//                   <Typography variant="h6" gutterBottom>
//                     Create Survey
//                     <br />
//                     <span style={{ fontSize: "0.875rem", color: "grey" }}>
//                       Explore new paths
//                     </span>
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 height: "100%",
//                 cursor: "pointer",
//                 "&:hover": { boxShadow: 3 },
//               }}
//               onClick={() => handleNavigation("/templates")}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <img
//                     src={TemplateImage}
//                     alt="Templates"
//                     style={{ width: "auto", height: "70px" }}
//                   />
//                   <Typography variant="h6" gutterBottom>
//                     Templates
//                     <br />
//                     <span style={{ fontSize: "0.875rem", color: "grey" }}>
//                       Create from existing
//                     </span>
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Card
//               sx={{
//                 height: "100%",
//                 cursor: "pointer",
//                 "&:hover": { boxShadow: 3 },
//               }}
//               onClick={handleOpenGroupModal}
//             >
//               <CardContent>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                   <img
//                     src={CreateSurveyImage}
//                     alt="Create Groups"
//                     style={{ width: "auto", height: "70px" }}
//                   />
//                   <Typography variant="h6" gutterBottom>
//                     Create Groups
//                     <br />
//                     <span style={{ fontSize: "0.875rem", color: "grey" }}>
//                       Add members
//                     </span>
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         <Box sx={{ display: "flex", gap: 4, mt: 3 }}>
//           {["Live", "Scheduled", "Draft", "All surveys", "Completed", "Group surveys"].map((option) => (
//             <Button
//               key={option}
//               onClick={() => handleOptionClick(option)}
//               disableRipple
//               sx={{
//                 textTransform: "none",
//                 color: selectedOption === option ? primaryColor200 : "text.secondary",
//                 borderBottom: selectedOption === option ? `2px solid ${primaryColor200}` : "none",
//                 borderRadius: 0,
//                 padding: 0,
//                 minWidth: "auto",
//                 backgroundColor: "transparent",
//                 "&:hover": {
//                   backgroundColor: "transparent",
//                 },
//                 "&:active": {
//                   backgroundColor: "transparent",
//                 },
//                 "&:focus": {
//                   outline: "none",
//                 },
//                 "&:focus-visible": {
//                   outline: "none",
//                 },
//               }}
//             >
//               {option}
//             </Button>
//           ))}
//         </Box>

//         <Box sx={{ mt: 2 }}>
//   {(selectedOption === "Live" || selectedOption === "Completed" || selectedOption === "Scheduled" || selectedOption === "All surveys") && (
//     <Grid container spacing={2}>
//       {surveys.map((survey, index) => (
//         <Grid item xs={12} md={4} key={index}>
//           <Card
//             sx={{
//               backgroundColor: "#F5F8FE",
//               cursor: "pointer",
//               "&:hover": { boxShadow: 3 },
//               borderRadius: "10px",
//               position: "relative", // Ensures proper positioning of the status label
//             }}
//           >
//             <CardContent>
//               {/* Start Date */}
//               <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", color: "#4A4A4A" }}>
//                 {new Date(survey.start_date).toISOString().split("T")[0]}
//               </Typography>

//               {/* Survey Title */}
//               <Typography variant="h6" gutterBottom sx={{ fontSize: "14px", color: "#27104E", fontWeight: 600 }}>
//                 {survey.survey_title}
//               </Typography>

//               {/* Faculty Name (Extracted from Email) */}
//               <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", color: "#27104E" }}>
//                 {survey.staff_email.split(".")[0].toUpperCase()}
//               </Typography>

//               {/* Progress Bar */}
//               <Box sx={{ mt: 1, width: "100%" }}>
//                 <LinearProgress
//                   variant="determinate"
//                   value={categorizeSurvey(survey) === "Completed" ? 100 : 0}
//                   sx={{ height: 6, borderRadius: 3, backgroundColor: "#E0E0E0", "& .MuiLinearProgress-bar": { backgroundColor: "#1FC16B" } }}
//                 />
//               </Box>

//               {/* Progress Text */}
//               <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: 1 }}>
//                 <Typography variant="body2" sx={{ color: "#27104E", fontSize: "12px" }}>
//                   Progress
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: "#27104E", fontSize: "12px" }}>
//                   {categorizeSurvey(survey) === "Completed" ? "100%" : "0%"}
//                 </Typography>
//               </Box>
//               {(categorizeSurvey(survey) === "Completed" || categorizeSurvey(survey) === "Scheduled") && <br />}

//               {/* ✅ Show AvatarGroup ONLY for Live Surveys */}
//               {categorizeSurvey(survey) === "Live" && (
//                 <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", mt: 1 }}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 12 } }}>
//                       <Avatar alt="User 1" src={user1} />
//                       <Avatar alt="User 2" src={user2} />
//                       <Avatar alt="User 3" src={user3} />
//                       <Avatar alt="User 4" src={PLUSICON} />
//                     </AvatarGroup>
//                     <Typography variant="body2" sx={{ color: "#E26001", fontWeight: "bold", ml: 1, fontSize: "12px" }}>
//                       + responses
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </CardContent>

//             {/* 📌 Status Label Positioned at Bottom Right */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: 10,
//                 right: 10,
//                 border: "1px solid",
//                 borderColor: categorizeSurvey(survey) === "Live" ? "#E26001" : categorizeSurvey(survey) === "Completed" ? "#1FC16B" : "#C13B06",
//                 borderRadius: "16px",
//                 padding: "2px 8px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "transparent",
//                 minWidth: "auto",
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: "#5A5A5A",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 {categorizeSurvey(survey) === "Live" ? "In Live" : categorizeSurvey(survey)}
//               </Typography>
//             </Box>
//           </Card>
//         </Grid>
//       ))}
//     </Grid>
//   )}

//   {selectedOption === "Draft" && <Typography>Draft surveys will be displayed here.</Typography>}
//   {selectedOption === "Group surveys" && <Typography>Group surveys will be displayed here.</Typography>}
// </Box>
//       </Box>
//       <Modal
//         open={openGroupModal}
//         onClose={handleCloseGroupModal}
//         aria-labelledby="group-creation-modal"
//         aria-describedby="group-creation-modal-description"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box sx={{
//           backgroundColor: "#fff",
//           padding: "40px",
//           borderRadius: "8px",
//           width: "650px",
//           height: "530px",
//           textAlign: "left",
//           position: "relative",
//         }}>
//           <IconButton
//             onClick={handleCloseGroupModal}
//             sx={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               color: "red",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {!showConditions ? (
//             <>
//               <Typography
//                 id="group-creation-modal"
//                 variant="h6"
//                 component="h2"
//                 sx={{
//                   fontWeight: "bold",
//                   textAlign: "left",
//                   marginLeft: "10px",
//                 }}
//               >
//                 Group creation
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   position: "relative",
//                   width: "100%",
//                   height: "80px",
//                   marginTop: "20px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     position: "absolute",
//                     left: "30%",
//                     zIndex: 1,
//                     border: "2px solid white",
//                   }}
//                 >
//                   <img
//                     src={profile1}
//                     alt="Profile 1"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                 </Box>

//                 <Box
//                   sx={{
//                     width: "90px",
//                     height: "90px",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     position: "absolute",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     zIndex: 2,
//                     border: "2px solid white",
//                   }}
//                 >
//                   <img
//                     src={profile2}
//                     alt="Profile 2"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                 </Box>

//                 <Box
//                   sx={{
//                     width: "60px",
//                     height: "60px",
//                     borderRadius: "50%",
//                     overflow: "hidden",
//                     position: "absolute",
//                     right: "30%",
//                     zIndex: 1,
//                     border: "2px solid white",
//                   }}
//                 >
//                   <img
//                     src={profile3}
//                     alt="Profile 3"
//                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                   />
//                 </Box>
//               </Box>

//               <Typography sx={{ mt: 10, textAlign: "center", color: "grey" }}>
//                 You wanna create a new group! Add members to <br />contribute to your survey.
//               </Typography>

//               <Box sx={{ mt: 4, ml: 28 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleSetConditions}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#7B61FF",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "4px 12px",
//                     fontSize: "0.75rem",
//                     height: "32px",
//                   }}
//                 >
//                   Set Conditions
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Typography
//                 id="group-creation-modal"
//                 variant="h6"
//                 component="h2"
//                 sx={{
//                   fontWeight: "bold",
//                   textAlign: "left",
//                   marginLeft: "10px",
//                 }}
//               >
//                 Set Conditions
//               </Typography>

//               <Box
//                 sx={{
//                   display: "flex",
//                   gap: 2,
//                   mt: 2,
//                   ml: "10px",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     padding: "8px 16px",
//                     textAlign: "center",
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "8px",
//                     cursor: "pointer",
//                   }}
//                   onClick={handleSkillBoxClick}
//                 >
//                   <img
//                     src={skillImage}
//                     alt="Skill"
//                     style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//                   />
//                   <Typography>Skill</Typography>
//                 </Box>

//                 <Box
//                   sx={{
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     padding: "8px 16px",
//                     textAlign: "center",
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "8px",
//                     cursor: "pointer",
//                   }}
//                   onClick={handleRPBoxClick}
//                 >
//                   <img
//                     src={RPImage}
//                     alt="RP"
//                     style={{ width: "40px", height: "28px", borderRadius: "50%" }}
//                   />
//                   <Typography>RP</Typography>
//                 </Box>

//                 <Box
//                   sx={{
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     padding: "8px 16px",
//                     textAlign: "center",
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: "8px",
//                     cursor: "pointer",
//                   }}
//                   onClick={handleRoleBoxClick}
//                 >
//                   <img
//                     src={contactImage}
//                     alt="Role"
//                     style={{ width: "40px", height: "30px", borderRadius: "50%" }}
//                   />
//                   <Typography>Role</Typography>
//                 </Box>
//               </Box>

//               {showSkills && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 1,
//                     mt: 2,
//                     ml: "10px",
//                   }}
//                 >
//                   {["C PROGRAMMING", "PYTHON", "SQL", "PROBLEM SOLVING", "JAVA", "UIUX", "APTITUDE"].map((skill, index) => (
//                     <Button
//                       key={index}
//                       variant="contained"
//                       onClick={() => handleSkillClick(skill)}
//                       sx={{
//                         textTransform: "none",
//                         backgroundColor: selectedSkill === skill ? "#6A50E0" : "rgb(226, 222, 248)",
//                         color: selectedSkill === skill ? "white" : "black",
//                         borderRadius: "20px",
//                         border: "2px solid #6A50E0",
//                         padding: "2px 8px",
//                         fontSize: "0.7rem",
//                         height: "24px",
//                         "&:hover": {
//                           backgroundColor: "#6A50E0",
//                           borderColor: "#6A50E0",
//                         },
//                       }}
//                     >
//                       {skill}
//                     </Button>
//                   ))}
//                 </Box>
//               )}

//               {selectedSkill && showSkills && (
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexWrap: "wrap",
//                     gap: 1,
//                     mt: 2,
//                     ml: "10px",
//                   }}
//                 >
//                   {getLevelButtons(selectedSkill).map((level, index) => (
//                     <Button
//                       key={index}
//                       variant="contained"
//                       onClick={() => handleLevelClick(level)}
//                       sx={{
//                         textTransform: "none",
//                         backgroundColor: selectedLevels.includes(`${selectedSkill} ${level}`) ? "#6A50E0" : "rgb(226, 222, 248)",
//                         color: selectedLevels.includes(`${selectedSkill} ${level}`) ? "white" : "black",
//                         borderRadius: "20px",
//                         border: "2px solid #6A50E0",
//                         padding: "2px 8px",
//                         fontSize: "0.7rem",
//                         height: "24px",
//                         "&:hover": {
//                           backgroundColor: "#6A50E0",
//                           borderColor: "#6A50E0",
//                         },
//                       }}
//                     >
//                       {level}
//                     </Button>
//                   ))}
//                 </Box>
//               )}

//               {showRPInput && (
//                 <Box
//                   sx={{
//                     mt: 2,
//                     ml: "10px",
//                     display: "flex",
//                     gap: 2,
//                   }}
//                 >
//                   <TextField
//                     label="Start Range"
//                     variant="outlined"
//                     value={startRange}
//                     onChange={(e) => setStartRange(e.target.value)}
//                     sx={{ width: "150px" }}
//                   />
//                   <TextField
//                     label="End Range"
//                     variant="outlined"
//                     value={endRange}
//                     onChange={(e) => setEndRange(e.target.value)}
//                     sx={{ width: "150px" }}
//                   />
//                 </Box>
//               )}

//               {showRoleDropdown && (
//                 <Box
//                   sx={{
//                     mt: 2,
//                     ml: "10px",
//                   }}
//                 >
//                   <FormControl fullWidth>
//                     <InputLabel id="role-select-label">Role</InputLabel>
//                     <Select
//                       labelId="role-select-label"
//                       id="role-select"
//                       value={selectedRole}
//                       label="Role"
//                       onChange={handleRoleChange}
//                       sx={{ width: "200px" }}
//                     >
//                       <MenuItem value="Faculty">Faculty</MenuItem>
//                       <MenuItem value="Student">Student</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>
//               )}

//               {selectedLevels.length > 0 && showSkills && (
//                 <Box
//                   sx={{
//                     mt: 2,
//                     ml: "10px",
//                     border: "1px solid #ddd",
//                     borderRadius: "4px",
//                     padding: "16px",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       gap: 1,
//                     }}
//                   >
//                     {selectedLevels.map((level, index) => (
//                       <Button
//                         key={index}
//                         variant="contained"
//                         sx={{
//                           textTransform: "none",
//                           backgroundColor: "rgb(226, 222, 248)",
//                           color: "black",
//                           borderRadius: "20px",
//                           border: "2px solid #6A50E0",
//                           padding: "2px 8px",
//                           fontSize: "0.7rem",
//                           height: "24px",
//                           "&:hover": {
//                             backgroundColor: "#6A50E0",
//                             borderColor: "#6A50E0",
//                           },
//                         }}
//                       >
//                         {level}
//                       </Button>
//                     ))}
//                   </Box>
//                   <Button
//                     onClick={handleDeselectAll}
//                     sx={{
//                       mt: 2,
//                       textTransform: "none",
//                       color: "red",
//                       fontSize: "0.7rem",
//                       "&:hover": {
//                         backgroundColor: "transparent",
//                       },
//                     }}
//                   >
//                     Deselect All
//                   </Button>
//                 </Box>
//               )}

//               <Box sx={{ mt: 2, ml: 52 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleSeeResults}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#7B61FF",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "4px 12px",
//                     fontSize: "0.75rem",
//                     height: "32px",
//                   }}
//                 >
//                   See Results
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>

//       {/* Results Modal */}
//       <Modal
//         open={openResultsModal}
//         onClose={handleCloseResultsModal}
//         aria-labelledby="results-modal"
//         aria-describedby="results-modal-description"
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box
//           sx={{
//             backgroundColor: "#fff",
//             padding: "40px",
//             borderRadius: "8px",
//             width: "80%",
//             maxWidth: "1200px",
//             height: "80%",
//             overflowY: "auto",
//             textAlign: "left",
//             position: "relative",
//           }}
//         >
//           {/* Close Button */}
//           <IconButton
//             onClick={handleCloseResultsModal}
//             sx={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               color: "red",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {/* Title */}
//           <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", mb: 2 }}>
//             Student Results
//           </Typography>

//           {/* Dropdown Filters */}
//           <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//             {/* Year Dropdown */}
//             <FormControl sx={{ minWidth: 120 }}>
//               <InputLabel>Year</InputLabel>
//               <Select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 displayEmpty
//               >
//                 <MenuItem value="All">All</MenuItem>
//                 <MenuItem value="1st Year">I</MenuItem>
//                 <MenuItem value="2nd Year">II</MenuItem>
//                 <MenuItem value="3rd Year">III</MenuItem>
//                 <MenuItem value="4th Year">IV</MenuItem>
//               </Select>
//             </FormControl>

//             {/* Department Dropdown */}
//             <FormControl sx={{ minWidth: 150 }}>
//               <InputLabel>Department</InputLabel>
//               <Select
//                 value={selectedDepartment}
//                 onChange={(e) => setSelectedDepartment(e.target.value)}
//                 displayEmpty
//               >
//                 <MenuItem value="All">All</MenuItem>
//                 <MenuItem value="CSE">CSE</MenuItem>
//                 <MenuItem value="ECE">ECE</MenuItem>
//                 <MenuItem value="MECH">MECH</MenuItem>
//                 <MenuItem value="CIVIL">CIVIL</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           {/* Student Table */}
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Year</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Department</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStudents.map((student, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <Avatar sx={{ bgcolor: "#1976d2", color: "white" }}>
//                         {student.Name.charAt(0).toUpperCase()}
//                       </Avatar>
//                       {student.Name}
//                     </TableCell>
//                     <TableCell>{student.Year}</TableCell>
//                     <TableCell>{student.Email}</TableCell>
//                     <TableCell>{student.Department}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default DashboardCreated;
