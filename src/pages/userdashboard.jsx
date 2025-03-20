// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Tabs,
//   Tab,
//   Avatar,
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   IconButton,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material"; // Import Grid, Card, and CardContent
// import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";
// import axios from "axios";

// const User = () => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [liveSurveys, setLiveSurveys] = useState([]); // State to store live surveys
//   const navigate = useNavigate();

//   // Fetch live surveys when the Live tab is selected
//   useEffect(() => {
//     if (tabIndex === 0) {
//       fetchLiveSurveys();
//     }
//   }, [tabIndex]);

//   const fetchLiveSurveys = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get("http://localhost:3000/get-surveysuser", {
//         headers: {
//           Authorization: token,
//         },
//       });

//       if (response.status === 200) {
//         setLiveSurveys(response.data); // Set the fetched surveys to state
//       }
//     } catch (error) {
//       console.error("Error fetching live surveys:", error);
//     }
//   };

//   const Sidebar = () => {
//     const [open, setOpen] = useState(true);

//     return (
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: open ? 240 : 60,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": { width: open ? 240 : 60, transition: "0.3s ease-in-out" },
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: open ? "space-between" : "center", p: 2 }}>
//           {open && <Typography sx={{ color: "#6A5ACD", fontWeight: "bold", fontSize: "1.2rem" }}>BIT SURVEY</Typography>}
//           <IconButton onClick={() => setOpen(!open)}>
//             <MenuIcon />
//           </IconButton>
//         </Box>
//         <Divider />
//         <List>
//           <ListItem button>
//             <ListItemIcon>
//               <DashboardIcon />
//             </ListItemIcon>
//             {open && <ListItemText primary="Dashboard" />}
//           </ListItem>
//         </List>
//         <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
//           <Divider />
//           <List>
//             <ListItem button>
//               <ListItemIcon>
//                 <LogoutIcon />
//               </ListItemIcon>
//               {open && <ListItemText primary="Log out" />}
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     );
//   };

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       <Sidebar />
//       <Box sx={{ flexGrow: 1, overflow: "auto", bgcolor: "white" }}>
//         <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: "white" }}>
//           <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Dashboard
//             </Typography>

//             {/* Push content to the right */}
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ marginLeft: "auto" }}>
//                 <Tab label="Live" />
//                 <Tab label="Completed" />
//               </Tabs>
//               <Avatar sx={{ cursor: "pointer" }} onClick={() => navigate("/user-details")} />
//             </Box>
//           </Toolbar>
//         </AppBar>

//         {/* Display Live Surveys */}
//         {tabIndex === 0 && (
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Live Surveys
//             </Typography>
//             <Grid container spacing={3}>
//               {liveSurveys.map((survey, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Card sx={{ bgcolor: "#f0f0f0" }}>
//                     <CardContent>
//                       <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                         {survey.survey_title}
//                       </Typography>
//                       <Typography color="textSecondary" sx={{ mt: 1 }}>
//                         Start Date: {new Date(survey.start_date).toLocaleDateString()}
//                       </Typography>
//                       <Typography color="textSecondary" sx={{ mt: 1 }}>
//                         End Date: {new Date(survey.end_date).toLocaleDateString()}
//                       </Typography>
//                       <Typography color="textSecondary" sx={{ mt: 1 }}>
//                         Created by: {survey.staff_email}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )}

//         {/* Display Completed Surveys (Placeholder) */}
//         {tabIndex === 1 && (
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//               Completed Surveys
//             </Typography>
//             <Typography>No completed surveys to display.</Typography>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default User;
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
} from "@mui/material"; // Import Grid, Card, and CardContent
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [liveSurveys, setLiveSurveys] = useState([]); // State to store live surveys
  const navigate = useNavigate();

  // Fetch live surveys when the Live tab is selected
  useEffect(() => {
    if (tabIndex === 0) {
      fetchLiveSurveys();
    }
  }, [tabIndex]);

  // const fetchLiveSurveys = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get("http://localhost:3000/get-surveysuser", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     if (response.status === 200) {
  //       setLiveSurveys(response.data); // Set the fetched surveys to state
  //     }
  //   } catch (error) {
  //     console.error("Error fetching live surveys:", error);
  //   }
  // };

  const fetchLiveSurveys = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/surveysuser", {
        headers: { Authorization: token },
      });

      if (response.status === 200) {
        console.log("Surveys fetched:", response.data);
        setLiveSurveys(response.data);
      }
    } catch (error) {
      console.error("Error fetching live surveys:", error);
    }
  };
  const Sidebar = () => {
    const [open, setOpen] = useState(true);

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
            <ListItem button>
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

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: "auto", bgcolor: "white" }}>
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: "white" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>

            {/* Push content to the right */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ marginLeft: "auto" }}>
                <Tab label="Live" />
                <Tab label="Completed" />
              </Tabs>
              <Avatar sx={{ cursor: "pointer" }} onClick={() => navigate("/user-details")} />
            </Box>
          </Toolbar>
        </AppBar>

    
{tabIndex === 0 && (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
      Live Surveys
    </Typography>
    <Grid container spacing={3}>
      {liveSurveys.map((survey, index) => {
        const startDateISO = new Date(survey.start_date).toISOString().split("T")[0]; // YYYY-MM-DD
        const endDateISO = new Date(survey.end_date).toISOString().split("T")[0]; // YYYY-MM-DD

        // Calculate the number of days left
        const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
        const startDate = new Date(startDateISO); // Parse startDateISO into a Date object
        const endDate = new Date(endDateISO); // Parse endDateISO into a Date object
        const currentDate = new Date(today); // Parse today's date into a Date object

        // Calculate the difference in days
        const timeDifference = endDate - currentDate; // Difference in milliseconds
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: "#F5F8FE", height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Display "Live: X days left" */}
                <Typography
  variant="subtitle1"
  sx={{
    fontWeight: "bold",
    fontSize:"14px",
    color: "#B42318", // Dark red text color
    backgroundColor: "#FEF3F2", // Light red background color
    borderRadius: "20px", // Oval shape
    padding: "4px 12px", // Padding to make it look like a button
    display: "inline-block", // Ensure the oval shape wraps the text
    textAlign: "center", // Center the text
    mb: 1, // Margin bottom
  }}
>
  {daysLeft > 0 ? `Live: ${daysLeft} days left` : "Expired"}
</Typography>
                <Typography variant="h6" sx={{ color:"#27104E",fontSize:"14px",fontWeight: "bold" }}>
                  {survey.survey_title}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  Start Date: {startDateISO}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  End Date: {endDateISO}
                </Typography>
                
                
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  </Box>
)}

        {/* Display Completed Surveys (Placeholder) */}
        {tabIndex === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Completed Surveys
            </Typography>
            <Typography>No completed surveys to display.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default User;
