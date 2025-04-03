import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid, Card, CardContent, Typography, Box, LinearProgress, AvatarGroup,
  Avatar
} from "@mui/material";
import user1 from "../assets/a.png";
import user2 from "../assets/m.png";
import user3 from "../assets/d.png";
import PLUSICON from "../assets/PLUS.png";

const MentorDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenteeSurveys();
  }, []);

  const fetchMenteeSurveys = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch("http://localhost:3000/get-mentee-surveys", {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSurveys(data);
      console.log("Fetched surveys:", data);
    } catch (error) {
      console.error("Error fetching mentee surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSurveyClick = (surveyId) => {
    navigate(`/survey-responses/${surveyId}`);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Loading surveys...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: "bold", 
          textAlign: "left",
        }}>
          Mentee Surveys
        </Typography>
      </Box>

      {/* Surveys Grid */}
      <Box sx={{ flexGrow: 1 }}>
        {surveys.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", mt: 4 }}>
            No live surveys available for your mentees at this time.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {surveys.map((survey) => {
              const startDate = new Date(survey.start_date).toLocaleDateString('en-CA');
              const creatorName = survey.staff_email.split('@')[0].split('.')[0].toUpperCase();
              
              return (
                <Grid item xs={12} sm={6} md={4} key={survey.id}>
                  <Card
                    onClick={() => handleSurveyClick(survey.id)}
                    sx={{
                      backgroundColor: "#F5F8FE",
                      cursor: "pointer",
                      "&:hover": { boxShadow: 3 },
                      borderRadius: "10px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      {/* Date - Top Left */}
                      <Typography variant="body2" sx={{ color: "#4A4A4A", mb: 1 }}>
                        {startDate}
                      </Typography>

                      {/* Survey Title and Creator */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 600, 
                          color: "#000",
                          fontSize: "1.1rem",
                          mb: 0.5
                        }}>
                          {survey.survey_title || "Untitled"}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: "#4A4A4A",
                          fontSize: "0.9rem"
                        }}>
                          {creatorName}
                        </Typography>
                      </Box>

                      {/* Progress Bar - Now Visible */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ 
                          color: "#4A4A4A",
                          fontSize: "0.8rem",
                          mb: 0.5
                        }}>
                          Progress
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LinearProgress
                            variant="determinate"
                            value={0}
                            sx={{
                              flexGrow: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: "#E0E0E0",
                              "& .MuiLinearProgress-bar": { 
                                backgroundColor: "#1FC16B",
                                borderRadius: 4
                              },
                            }}
                          />
                          <Typography variant="body2" sx={{ 
                            color: "#4A4A4A",
                            fontSize: "0.8rem",
                            ml: 1
                          }}>
                            0%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    {/* Responses and Status */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 2,
                      pt: 0
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarGroup max={4} sx={{ 
                          '& .MuiAvatar-root': { 
                            width: 24, 
                            height: 24, 
                            fontSize: 12 
                          } 
                        }}>
                          <Avatar alt="User 1" src={user1} />
                          <Avatar alt="User 2" src={user2} />
                          <Avatar alt="User 3" src={user3} />
                          <Avatar alt="More users" src={PLUSICON} />
                        </AvatarGroup>
                        <Typography variant="body2" sx={{ 
                          color: "#E26001",
                          fontWeight: "bold",
                          ml: 1,
                          fontSize: "0.8rem"
                        }}>
                          + responses
                        </Typography>
                      </Box>
                      
                      <Box
                        sx={{
                          border: "1px solid #E26001",
                          borderRadius: "16px",
                          padding: "2px 8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "transparent",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#5A5A5A",
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                          }}
                        >
                          In Live
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MentorDashboard;
