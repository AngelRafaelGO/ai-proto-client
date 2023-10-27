import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./ParcoursName";

function ParcoursStudies() {
  const navigate = useNavigate();
  const [userStudies, setUserStudies] = useState();
  const { state } = useLocation();
  const { userName, userAge, userInterests, userInterestsPro } = state;

  const handleUserSelection = (studiesChoice) => {
    setUserStudies(studiesChoice);
  };

  useEffect(() => {
    if (userStudies != undefined) {
      navigate("/chat", {
        state: {
          userName: userName,
          userAge: userAge,
          userInterests: userInterests,
          userInterestsPro: userInterestsPro,
          userStudies: userStudies,
        },
      });
    }
  }, [userStudies]);

  return (
    <Box>
      <Box className="iaprop-stats-title-container">
        <Box sx={{ position: "absolute", left: "5rem", top: "2rem" }}>
          <IconButton color="secondary" onClick={() => navigate("/")}>
            <HomeIcon sx={{ color: "ivory" }} />
          </IconButton>
        </Box>
        <Box sx={{ marginTop: "4rem" }}>
          <Typography variant="h5">
            Quel niveau d'études cherchez-vous ?
          </Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserSelection("bac + 2")}
          >
            bac + 2
          </Button>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserSelection("bac + 3")}
          >
            bac + 3
          </Button>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserSelection("bac + 5")}
          >
            bac + 5
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ParcoursStudies;
