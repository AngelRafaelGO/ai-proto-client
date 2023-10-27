import React, { useState } from "react";
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

function ParcoursInterestsPro() {
  const navigate = useNavigate();
  const [userInterestsPro, setuSerInterestsPro] = useState();
  const [toastOpen, setToastOpen] = useState(false);

  const handleUserIntPro = (userInput) => {
    setuSerInterestsPro(userInput);
  };

  const { state } = useLocation();
  const { userName, userAge, userInterests } = state;

  const handleNavigation = () => {
    if (userInterestsPro == "" || userInterestsPro === undefined) {
      setToastOpen(true);
    } else {
      navigate("/parcoursstudies", {
        state: {
          userName: userName,
          userAge: userAge,
          userInterests: userInterests,
          userInterestsPro: userInterestsPro,
        },
      });
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
          <Typography variant="h5">
            Par rapport à votre projet professionel, quels sont vos centres
            d'intérêt
          </Typography>
        </Box>
      </Box>
      <Box className="iaprop-stats-container">
        <Box className="iaprop-stats-generic-stat-container">
          <TextField
            id="interetsPro"
            label="intérêts professionnels"
            variant="outlined"
            onChange={(e) => handleUserIntPro(e.target.value)}
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

export default ParcoursInterestsPro;
