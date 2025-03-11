import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";

const ProgressBar = ({ progress }) => {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      {/* Progress percentage text with light violet color */}
      <Typography variant="body2" sx={{ color: "#D1C4E9" }}> {/* Correct light violet color */}
        Progress: {progress}%
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 5 }} />
    </Box>
  );
};

export default ProgressBar;