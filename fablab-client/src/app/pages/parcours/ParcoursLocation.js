import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import "./ParcoursName";

function ParcoursLocation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userLocation, setUserLocation] = useState();
  const [userData, setUserData] = useState();

  const handleUserLocation = (userLocation) => {
    setUserLocation(userLocation);
  };

  useEffect(() => {
    if (userLocation != undefined) {
      navigate("/chat", {
        state: {
          userName: userData.userName,
          userAge: userData.userAge,
          userInterests: userData.userInterests,
          userInterestsPro: userData.userInterestsPro,
          userStudies: userData.userStudies,
          userLocation: userLocation,
        },
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (state === null) {
      navigate("/");
    } else {
      const {
        userName,
        userAge,
        userInterests,
        userInterestsPro,
        userStudies,
      } = state;
      setUserData({
        userName,
        userAge,
        userInterests,
        userInterestsPro,
        userStudies,
      });
    }
  }, []);

  return (
    <Box>
      <Box className="iaprop-stats-title-container">
        <Box sx={{ position: "absolute", left: "5rem", top: "2rem" }}>
          <IconButton color="secondary" onClick={() => navigate("/")}>
            <HomeIcon sx={{ color: "ivory" }} />
          </IconButton>
        </Box>
        <Box sx={{ marginTop: "4rem" }}>
          <Typography variant="h5">Quel est votre code postal ?</Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserLocation("paris")}
          >
            Paris
          </Button>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserLocation("cergy-pontoise")}
          >
            Cergy-Pontoise
          </Button>
          <Button
            sx={{ marginRight: "2rem" }}
            variant="outlined"
            onClick={() => handleUserLocation("montigny-le-brotonneux")}
          >
            Montigny-le-Brotonneux
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ParcoursLocation;
