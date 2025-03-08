// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
//   AppBar, Toolbar, Typography, Box, CssBaseline, IconButton, InputBase,
//   Avatar, Button, useMediaQuery, useTheme, Grid, Card, CardContent, Modal,
//   TextField, MenuItem, Select, FormControl, InputLabel
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
// import skillImage from "../assets/image.png"; // Replace with the correct path to your image
// import RPImage from "../assets/rp.png";
// import contactImage from "../assets/contact.png";

// const desktopDrawerWidth = 220;
// const primaryColor200 = "#7B3DFF";

// const DashboardCreated = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("Live");
//   const [openGroupModal, setOpenGroupModal] = useState(false);
//   const [showConditions, setShowConditions] = useState(false); // State to toggle between screens
//   const [showSkills, setShowSkills] = useState(false); // State to toggle skills visibility
//   const [selectedSkill, setSelectedSkill] = useState(null); // State to track the selected skill
//   const [selectedLevels, setSelectedLevels] = useState([]); // State to track selected levels
//   const [showRPInput, setShowRPInput] = useState(false); // State to toggle RP input fields
//   const [startRange, setStartRange] = useState(""); // State for starting range
//   const [endRange, setEndRange] = useState(""); // State for ending range
//   const [showRoleDropdown, setShowRoleDropdown] = useState(false); // State to toggle role dropdown
//   const [selectedRole, setSelectedRole] = useState(""); // State to track selected role
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
//     setShowConditions(false); // Reset to group creation screen when modal opens
//   };

//   const handleCloseGroupModal = () => {
//     setOpenGroupModal(false);
//   };

//   const handleSetConditions = () => {
//     setShowConditions(true); // Show the conditions screen
//   };

//   const handleSkillBoxClick = () => {
//     setShowSkills(true); // Show skills functionality
//     setShowRPInput(false); // Hide RP input fields
//     setShowRoleDropdown(false); // Hide role dropdown
//   };

//   const handleSkillClick = (skill) => {
//     setSelectedSkill(skill); // Set the selected skill
//   };

//   const handleLevelClick = (level) => {
//     const combinedSkillLevel = `${selectedSkill} ${level}`;
//     if (selectedLevels.includes(combinedSkillLevel)) {
//       setSelectedLevels(selectedLevels.filter(item => item !== combinedSkillLevel));
//     } else {
//       setSelectedLevels([...selectedLevels, combinedSkillLevel]);
//     }
//   };

//   const handleDeselectAll = () => {
//     setSelectedLevels([]); // Clear all selected levels
//   };

//   const handleRPBoxClick = () => {
//     setShowRPInput(true); // Show RP input fields
//     setShowSkills(false); // Hide skills functionality
//     setShowRoleDropdown(false); // Hide role dropdown
//   };

//   const handleRoleBoxClick = () => {
//     setShowRoleDropdown(true); // Show role dropdown
//     setShowSkills(false); // Hide skills functionality
//     setShowRPInput(false); // Hide RP input fields
//   };

//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value); // Set the selected role
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
//                 "&:hover": { boxShadow: 3 } 
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
//                 "&:hover": { boxShadow: 3 } 
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
//                 "&:hover": { boxShadow: 3 } 
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
//           {selectedOption === "Live" && <Typography>Live surveys will be displayed here.</Typography>}
//           {selectedOption === "Scheduled" && <Typography>Scheduled surveys will be displayed here.</Typography>}
//           {selectedOption === "Draft" && <Typography>Draft surveys will be displayed here.</Typography>}
//           {selectedOption === "All surveys" && <Typography>All surveys will be displayed here.</Typography>}
//           {selectedOption === "Completed" && <Typography>Completed surveys will be displayed here.</Typography>}
//           {selectedOption === "Group surveys" && <Typography>Group surveys will be displayed here.</Typography>}
//         </Box>
//       </Box>

//       {/* Group Creation Modal */}
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
//           {/* Close icon in the top-right corner */}
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

//           {/* Toggle between Group Creation and Conditions screens */}
//           {!showConditions ? (
//             <>
//               {/* Group creation screen */}
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

//               {/* Overlapping profile pictures */}
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
//                 {/* Left profile picture */}
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

//                 {/* Center profile picture */}
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

//                 {/* Right profile picture */}
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

//               {/* Buttons with bold text */}
//               <Box sx={{ mt: 4, ml: 28 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleSetConditions}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#7B61FF",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "4px 12px", // Reduced padding
//                     fontSize: "0.75rem", // Reduced font size
//                     height: "32px", // Reduced height
//                   }}
//                 >
//                   Set Conditions
//                 </Button>
//               </Box>
//             </>
//           ) : (
//             <>
//               {/* Conditions screen */}
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
//                   display: "flex", // Align boxes horizontally
//                   gap: 2, // Add spacing between boxes
//                   mt: 2, // Margin top
//                   ml: "10px", // Margin left
//                 }}
//               >
//                 {/* Skill Box */}
//                 <Box
//                   sx={{
//                     border: "1px solid #ddd", // Add border
//                     borderRadius: "4px", // Rounded corners
//                     padding: "8px 16px", // Padding inside the box
//                     textAlign: "center", // Center text
//                     flex: 1, // Equal width for all boxes
//                     display: "flex", // Use flexbox to align image and text
//                     flexDirection: "column", // Stack image and text vertically
//                     alignItems: "center", // Center items horizontally
//                     gap: "8px", // Add spacing between image and text
//                     cursor: "pointer", // Add pointer cursor
//                   }}
//                   onClick={handleSkillBoxClick}
//                 >
//                   {/* Image */}
//                   <img
//                     src={skillImage} // Replace with the correct path to your image
//                     alt="Skill"
//                     style={{ width: "30px", height: "30px", borderRadius: "50%" }} // Adjust size and styling
//                   />
//                   {/* Text */}
//                   <Typography>Skill</Typography>
//                 </Box>

//                 {/* RP Box */}
//                 <Box
//                   sx={{
//                     border: "1px solid #ddd", // Add border
//                     borderRadius: "4px", // Rounded corners
//                     padding: "8px 16px", // Padding inside the box
//                     textAlign: "center", // Center text
//                     flex: 1, // Equal width for all boxes
//                     display: "flex", // Use flexbox to align image and text
//                     flexDirection: "column", // Stack image and text vertically
//                     alignItems: "center", // Center items horizontally
//                     gap: "8px", // Add spacing between image and text
//                     cursor: "pointer", // Add pointer cursor
//                   }}
//                   onClick={handleRPBoxClick}
//                 >
//                   {/* Image */}
//                   <img
//                     src={RPImage} // Replace with the correct path to your image
//                     alt="RP"
//                     style={{ width: "40px", height: "28px", borderRadius: "50%" }} // Adjust size and styling
//                   />
//                   {/* Text */}
//                   <Typography>RP</Typography>
//                 </Box>

//                 {/* Roles Box */}
//                 <Box
//                   sx={{
//                     border: "1px solid #ddd", // Add border
//                     borderRadius: "4px", // Rounded corners
//                     padding: "8px 16px", // Padding inside the box
//                     textAlign: "center", // Center text
//                     flex: 1, // Equal width for all boxes
//                     display: "flex", // Use flexbox to align image and text
//                     flexDirection: "column", // Stack image and text vertically
//                     alignItems: "center", // Center items horizontally
//                     gap: "8px", // Add spacing between image and text
//                     cursor: "pointer", // Add pointer cursor
//                   }}
//                   onClick={handleRoleBoxClick}
//                 >
//                   {/* Image */}
//                   <img
//                     src={contactImage} // Replace with the correct path to your image
//                     alt="Role"
//                     style={{ width: "40px", height: "30px", borderRadius: "50%" }} // Adjust size and styling
//                   />
//                   {/* Text */}
//                   <Typography>Role</Typography>
//                 </Box>
//               </Box>

//               {/* Skills Buttons */}
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
//                         backgroundColor: selectedSkill === skill ? "#6A50E0" : "rgb(226, 222, 248)", // Background color
//                         color: selectedSkill === skill ? "white" : "black", // Text color
//                         borderRadius: "20px", // Rounded corners
//                         border: "2px solid #6A50E0", // Border color
//                         padding: "2px 8px", // Further reduce padding to make the button smaller
//                         fontSize: "0.7rem", // Reduced font size
//                         height: "24px", // Reduced height
//                         "&:hover": {
//                           backgroundColor: "#6A50E0", // Change background color on hover
//                           borderColor: "#6A50E0", // Change border color on hover
//                         },
//                       }}
//                     >
//                       {skill}
//                     </Button>
//                   ))}
//                 </Box>
//               )}

//               {/* Level Buttons */}
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
//                         backgroundColor: selectedLevels.includes(`${selectedSkill} ${level}`) ? "#6A50E0" : "rgb(226, 222, 248)", // Background color
//                         color: selectedLevels.includes(`${selectedSkill} ${level}`) ? "white" : "black", // Text color
//                         borderRadius: "20px", // Rounded corners
//                         border: "2px solid #6A50E0", // Border color
//                         padding: "2px 8px", // Further reduce padding to make the button smaller
//                         fontSize: "0.7rem", // Reduced font size
//                         height: "24px", // Reduced height
//                         "&:hover": {
//                           backgroundColor: "#6A50E0", // Change background color on hover
//                           borderColor: "#6A50E0", // Change border color on hover
//                         },
//                       }}
//                     >
//                       {level}
//                     </Button>
//                   ))}
//                 </Box>
//               )}

//               {/* RP Input Fields */}
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

//               {/* Role Dropdown */}
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

//               {/* Selected Levels Box */}
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
//                           backgroundColor: "rgb(226, 222, 248)", // Background color
//                           color: "black", // Text color
//                           borderRadius: "20px", // Rounded corners
//                           border: "2px solid #6A50E0", // Border color
//                           padding: "2px 8px", // Further reduce padding to make the button smaller
//                           fontSize: "0.7rem", // Reduced font size
//                           height: "24px", // Reduced height
//                           "&:hover": {
//                             backgroundColor: "#6A50E0", // Change background color on hover
//                             borderColor: "#6A50E0", // Change border color on hover
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
//                       fontSize: "0.7rem", // Reduced font size
//                       "&:hover": {
//                         backgroundColor: "transparent",
//                       },
//                     }}
//                   >
//                     Deselect All
//                   </Button>
//                 </Box>
//               )}

//               {/* See Results Button */}
//               <Box sx={{ mt: 2, ml: 52 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleSetConditions}
//                   sx={{
//                     fontWeight: "bold",
//                     backgroundColor: "#7B61FF",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     padding: "4px 12px", // Reduced padding
//                     fontSize: "0.75rem", // Reduced font size
//                     height: "32px", // Reduced height
//                   }}
//                 >
//                   See Results
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default DashboardCreated;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, Box, CssBaseline, IconButton, InputBase,
  Avatar, Button, useMediaQuery, useTheme, Grid, Card, CardContent, Modal,
  TextField, MenuItem, Select, FormControl, InputLabel, LinearProgress, AvatarGroup
} from "@mui/material";
import { styled } from "@mui/material/styles";
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

const desktopDrawerWidth = 220;
const primaryColor200 = "#7B3DFF";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "320px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  padding: "12px", // Reduced padding to fit content better
  boxShadow: "none",
  backgroundColor: "#F5F8FE",
  cursor: "pointer",
  transition: "box-shadow 0.3s",
  position: "relative", // Added for positioning the three dots
  "&:hover": {
    boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down("sm")]: {
    height: "auto", // Responsive height for smaller screens
    padding: "8px", // Adjust padding for smaller screens
  },
  [theme.breakpoints.up("sm")]: {
    height: "200px", // Reduced height for larger screens
  },
}));

const LiveSurveyBox = () => {
  return (
    <StyledCard>
      {/* Three dots on the top right corner */}
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "8px",
          cursor: "pointer",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "24px", color: "#000" }}>
          &#8942; {/* Unicode character for three dots */}
        </Typography>
      </Box>

      <CardContent>
        <Box
          sx={{
            backgroundColor: "#F5C6CB", // Baby pink background
            color: "#800000", // Dark maroon text color
            borderRadius: "16px", // Oval shape
            padding: "4px 12px",
            display: "inline-block",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Live: 6 Days Left
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "600", // Semi-bold
            mt: 1,
            fontSize: "14px", // Smaller font size for "Product thinking activity"
          }}
        >
          Product thinking activity
        </Typography>
        <Typography variant="body2" sx={{ color: "grey", mt: 0.5, fontSize: "12px" }}>
          Personalized skill team
        </Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={0}
            sx={{ height: 6, borderRadius: 3, backgroundColor: "#E0E0E0" }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
  <Typography variant="body2" sx={{ color: "black", fontSize: "12px" }}>
    Progress
  </Typography>
  <Typography variant="body2" sx={{ color: "black", fontSize: "12px" }}>
    0%
  </Typography>
</Box>
        </Box>
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 20, height: 20, fontSize: 12 } }}>
      <Avatar alt="User 1" src={user1} /> 
      <Avatar alt="User 2" src={user2} /> 
      <Avatar alt="User 3" src={user3} /> 
    </AvatarGroup>
            <Typography variant="body2" sx={{ color: "#FF5733", fontWeight: "bold", ml: 1, fontSize: "12px" }}>
              + 99 responses
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50", // Green background color
              color: "#fff", // White text color
              borderRadius: "4px", // Sharp corners for a box shape
              padding: "4px 12px", // Smaller padding to fit the text
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "12px", // Smaller font size
              minWidth: "80px", // Fixed width to ensure consistency
              "&:hover": {
                backgroundColor: "#45a049", // Slightly darker green for hover
              },
            }}
          >
            Start
          </Button>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      setSelectedLevels(selectedLevels.filter(item => item !== combinedSkillLevel));
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
        sx={{ fontWeight: "bold", color: primaryColor200, mb: 2, fontFamily: "Poppins, sans-serif" }}
      >
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
                "&:hover": { boxShadow: 3 } 
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
                "&:hover": { boxShadow: 3 } 
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
                "&:hover": { boxShadow: 3 } 
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
          {selectedOption === "Live" && <LiveSurveyBox />}
          {selectedOption === "Scheduled" && <Typography>Scheduled surveys will be displayed here.</Typography>}
          {selectedOption === "Draft" && <Typography>Draft surveys will be displayed here.</Typography>}
          {selectedOption === "All surveys" && <Typography>All surveys will be displayed here.</Typography>}
          {selectedOption === "Completed" && <Typography>Completed surveys will be displayed here.</Typography>}
          {selectedOption === "Group surveys" && <Typography>Group surveys will be displayed here.</Typography>}
        </Box>
      </Box>

      {/* Group Creation Modal */}
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
          {/* Close icon in the top-right corner */}
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

          {/* Toggle between Group Creation and Conditions screens */}
          {!showConditions ? (
            <>
              {/* Group creation screen */}
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

              {/* Overlapping profile pictures */}
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
                {/* Left profile picture */}
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

                {/* Center profile picture */}
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

                {/* Right profile picture */}
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

              {/* Buttons with bold text */}
              <Box sx={{ mt: 4, ml: 28 }}>
                <Button
                  variant="contained"
                  onClick={handleSetConditions}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#7B61FF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 12px", // Reduced padding
                    fontSize: "0.75rem", // Reduced font size
                    height: "32px", // Reduced height
                  }}
                >
                  Set Conditions
                </Button>
              </Box>
            </>
          ) : (
            <>
              {/* Conditions screen */}
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
                  display: "flex", // Align boxes horizontally
                  gap: 2, // Add spacing between boxes
                  mt: 2, // Margin top
                  ml: "10px", // Margin left
                }}
              >
                {/* Skill Box */}
                <Box
                  sx={{
                    border: "1px solid #ddd", // Add border
                    borderRadius: "4px", // Rounded corners
                    padding: "8px 16px", // Padding inside the box
                    textAlign: "center", // Center text
                    flex: 1, // Equal width for all boxes
                    display: "flex", // Use flexbox to align image and text
                    flexDirection: "column", // Stack image and text vertically
                    alignItems: "center", // Center items horizontally
                    gap: "8px", // Add spacing between image and text
                    cursor: "pointer", // Add pointer cursor
                  }}
                  onClick={handleSkillBoxClick}
                >
                  {/* Image */}
                  <img
                    src={skillImage} // Replace with the correct path to your image
                    alt="Skill"
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }} // Adjust size and styling
                  />
                  {/* Text */}
                  <Typography>Skill</Typography>
                </Box>

                {/* RP Box */}
                <Box
                  sx={{
                    border: "1px solid #ddd", // Add border
                    borderRadius: "4px", // Rounded corners
                    padding: "8px 16px", // Padding inside the box
                    textAlign: "center", // Center text
                    flex: 1, // Equal width for all boxes
                    display: "flex", // Use flexbox to align image and text
                    flexDirection: "column", // Stack image and text vertically
                    alignItems: "center", // Center items horizontally
                    gap: "8px", // Add spacing between image and text
                    cursor: "pointer", // Add pointer cursor
                  }}
                  onClick={handleRPBoxClick}
                >
                  {/* Image */}
                  <img
                    src={RPImage} // Replace with the correct path to your image
                    alt="RP"
                    style={{ width: "40px", height: "28px", borderRadius: "50%" }} // Adjust size and styling
                  />
                  {/* Text */}
                  <Typography>RP</Typography>
                </Box>

                {/* Roles Box */}
                <Box
                  sx={{
                    border: "1px solid #ddd", // Add border
                    borderRadius: "4px", // Rounded corners
                    padding: "8px 16px", // Padding inside the box
                    textAlign: "center", // Center text
                    flex: 1, // Equal width for all boxes
                    display: "flex", // Use flexbox to align image and text
                    flexDirection: "column", // Stack image and text vertically
                    alignItems: "center", // Center items horizontally
                    gap: "8px", // Add spacing between image and text
                    cursor: "pointer", // Add pointer cursor
                  }}
                  onClick={handleRoleBoxClick}
                >
                  {/* Image */}
                  <img
                    src={contactImage} // Replace with the correct path to your image
                    alt="Role"
                    style={{ width: "40px", height: "30px", borderRadius: "50%" }} // Adjust size and styling
                  />
                  {/* Text */}
                  <Typography>Role</Typography>
                </Box>
              </Box>

              {/* Skills Buttons */}
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
                        backgroundColor: selectedSkill === skill ? "#6A50E0" : "rgb(226, 222, 248)", // Background color
                        color: selectedSkill === skill ? "white" : "black", // Text color
                        borderRadius: "20px", // Rounded corners
                        border: "2px solid #6A50E0", // Border color
                        padding: "2px 8px", // Further reduce padding to make the button smaller
                        fontSize: "0.7rem", // Reduced font size
                        height: "24px", // Reduced height
                        "&:hover": {
                          backgroundColor: "#6A50E0", // Change background color on hover
                          borderColor: "#6A50E0", // Change border color on hover
                        },
                      }}
                    >
                      {skill}
                    </Button>
                  ))}
                </Box>
              )}

              {/* Level Buttons */}
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
                        backgroundColor: selectedLevels.includes(`${selectedSkill} ${level}`) ? "#6A50E0" : "rgb(226, 222, 248)", // Background color
                        color: selectedLevels.includes(`${selectedSkill} ${level}`) ? "white" : "black", // Text color
                        borderRadius: "20px", // Rounded corners
                        border: "2px solid #6A50E0", // Border color
                        padding: "2px 8px", // Further reduce padding to make the button smaller
                        fontSize: "0.7rem", // Reduced font size
                        height: "24px", // Reduced height
                        "&:hover": {
                          backgroundColor: "#6A50E0", // Change background color on hover
                          borderColor: "#6A50E0", // Change border color on hover
                        },
                      }}
                    >
                      {level}
                    </Button>
                  ))}
                </Box>
              )}

              {/* RP Input Fields */}
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

              {/* Role Dropdown */}
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

              {/* Selected Levels Box */}
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
                          backgroundColor: "rgb(226, 222, 248)", // Background color
                          color: "black", // Text color
                          borderRadius: "20px", // Rounded corners
                          border: "2px solid #6A50E0", // Border color
                          padding: "2px 8px", // Further reduce padding to make the button smaller
                          fontSize: "0.7rem", // Reduced font size
                          height: "24px", // Reduced height
                          "&:hover": {
                            backgroundColor: "#6A50E0", // Change background color on hover
                            borderColor: "#6A50E0", // Change border color on hover
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
                      fontSize: "0.7rem", // Reduced font size
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    Deselect All
                  </Button>
                </Box>
              )}

              {/* See Results Button */}
              <Box sx={{ mt: 2, ml: 52 }}>
                <Button
                  variant="contained"
                  onClick={handleSetConditions}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#7B61FF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px 12px", // Reduced padding
                    fontSize: "0.75rem", // Reduced font size
                    height: "32px", // Reduced height
                  }}
                >
                  See Results
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardCreated;