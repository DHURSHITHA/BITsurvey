import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Card,
  CardContent,
  Button,
  Grid,
  Box,
  AvatarGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProgressBar from "./Progressbar";

const User = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const liveSurveys = [
    { title: "Product thinking activity", subtitle: "Personalized skill team", daysLeft: 8, progress: 0 },
    { title: "Academics survey", subtitle: "Office academics", daysLeft: 8, progress: 30 },
    { title: "Academics survey", subtitle: "Office academics", daysLeft: 8, progress: 30 },
    { title: "Academics survey", subtitle: "Office academics", daysLeft: 8, progress: 30 },
    { title: "Academics survey", subtitle: "Office academics", daysLeft: 8, progress: 30 },
    { title: "Academics survey", subtitle: "Office academics", daysLeft: 8, progress: 30 },
  ];

  const completedSurveys = new Array(6).fill({ title: "Academics survey", subtitle: "Office academics" });

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflow: "auto", bgcolor: "#f8f9fa" }}>
        <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: "white" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Dashboard
            </Typography>
            <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)}>
              <Tab label="Live" />
              <Tab label="Completed" />
            </Tabs>
            <Avatar sx={{ cursor: "pointer" }} onClick={() => navigate("/user-details")} />
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3, bgcolor: "white" }}> {/* Grid background set to white */}
          <Grid container spacing={3}>
            {(tabIndex === 0 ? liveSurveys : completedSurveys).map((survey, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ bgcolor: "#f0f0f0" }}> {/* Card background set to light grey */}
                  <CardContent>
                    {tabIndex === 0 && (
                      <Typography color="error">Live: {survey.daysLeft} Days Left</Typography>
                    )}
                    <Typography variant="h6">{survey.title}</Typography>
                    <Typography color="textSecondary">{survey.subtitle}</Typography>
                    {tabIndex === 0 && <ProgressBar progress={survey.progress} />}
                    {/* Align AvatarGroup to the left and reduce size */}
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                      <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 24, height: 24 } }}>
                        <Avatar alt="User 1" src="/path/to/user1.jpg" />
                        <Avatar alt="User 2" src="/path/to/user2.jpg" />
                        <Avatar alt="User 3" src="/path/to/user3.jpg" />
                        <Avatar alt="User 4" src="/path/to/user4.jpg" />
                      </AvatarGroup>
                      <Button
                        variant="contained"
                        color={tabIndex === 0 ? (survey.progress > 0 ? "warning" : "success") : "success"}
                        size="small"
                      >
                        {tabIndex === 0 ? (survey.progress > 0 ? "Resume" : "Start") : "View"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
