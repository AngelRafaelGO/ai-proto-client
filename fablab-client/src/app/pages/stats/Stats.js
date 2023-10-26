import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Stats.css";

function Stats() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Get some stats from api");
  }, []);

  return (
    <Box>
      <Box className="iaprop-stats-title-container">
        <Box sx={{ position: "absolute", left: "5rem" }}>
          <IconButton color="secondary" onClick={() => navigate("/chat")}>
            <ArrowBackIcon sx={{ color: "ivory" }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h5">Stats</Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">Stat 1</Box>
        <Box className="iaprop-stats-generic-stat-container">Stat 2</Box>
        <Box className="iaprop-stats-generic-stat-container">Stat 3</Box>
        <Box className="iaprop-stats-generic-stat-container">Stat 4</Box>
        <Box className="iaprop-stats-generic-stat-container">Stat 5</Box>
      </Box>
    </Box>
  );
}

export default Stats;
