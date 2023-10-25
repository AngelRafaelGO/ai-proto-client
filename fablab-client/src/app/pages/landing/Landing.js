import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <Box className="aiprop-landing-main-container">
      <Box>
        <Box>
          <Typography variant="h1">Bienvenue à IASup</Typography>
          <Typography sx={{ marginTop: "2rem" }} variant="h6">
            IASup vous aide dans votre recherche d'école et de formation
          </Typography>
          <Typography variant="h6">
            Discutez avec notre IA et trouvez votre voie !
          </Typography>
        </Box>
        <Box className="aiprop-landing-chatbox-navigation">
          <Button variant="outlined" onClick={() => navigate("/chat")}>
            Chat
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Landing;
