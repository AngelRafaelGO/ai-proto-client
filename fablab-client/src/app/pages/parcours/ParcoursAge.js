import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import HomeIcon from "@mui/icons-material/Home";
import "./ParcoursName";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ParcoursAge() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userAge, setUserAge] = useState();
  const [toastOpen, setToastOpen] = useState(false);
  const [userData, setUserData] = useState();

  const handleUserAge = (userInput) => {
    setUserAge(userInput);
  };

  const handleNavigation = () => {
    if (userAge == "" || userAge === undefined) {
      setToastOpen(true);
    } else {
      navigate("/parcoursinterests", {
        state: { userAge: userAge, userName: userData },
      });
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  useEffect(() => {
    if (state === null) {
      navigate("/");
    } else {
      const { userName } = state;
      setUserData(userName);
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
          <Typography variant="h5">Quel âge avez-vous ?</Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">
          <TextField
            id="age"
            label="Âge"
            variant="outlined"
            onChange={(e) => handleUserAge(e.target.value)}
          />
        </Box>
        <Button sx={{ marginTop: "3rem" }} onClick={() => handleNavigation()}>
          Continuer
        </Button>
      </Box>
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Le champ est vide
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ParcoursAge;
