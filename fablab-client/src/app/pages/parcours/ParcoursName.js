import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function ParcoursName() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [toastOpen, setToastOpen] = useState(false);

  const handleUserName = (userInput) => {
    setUserName(userInput);
  };

  const handleNavigation = () => {
    if (userName == "" || userName === undefined) {
      setToastOpen(true);
    } else {
      navigate("/parcoursage", { state: { userName: userName } });
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  return (
    <Box>
      <Box className="iaprop-stats-title-container">
        <Box sx={{ position: "absolute", left: "5rem", top: "2rem" }}>
          <IconButton color="secondary" onClick={() => navigate("/")}>
            <HomeIcon sx={{ color: "ivory" }} />
          </IconButton>
        </Box>
        <Box sx={{ marginTop: "4rem" }}>
          <Typography variant="h5">Quel est votre prénom ?</Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">
          <TextField
            id="prenom"
            label="Prénom"
            variant="outlined"
            onChange={(e) => handleUserName(e.target.value)}
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

export default ParcoursName;
