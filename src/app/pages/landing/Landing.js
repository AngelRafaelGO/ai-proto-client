import React from "react";
import logo from "../../assets/logo.svg";
import "./Landing.css";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <Box className="aiprop-landing-main-container">
      <Box>
        <Typography>Welcome</Typography>
        <Button variant="outlined" onClick={() => navigate("/chat")}>
          Chat
        </Button>
      </Box>
    </Box>
  );
}

export default Landing;
