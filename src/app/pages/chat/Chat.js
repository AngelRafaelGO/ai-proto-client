import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Chat.css";

function Chat() {
  const navigate = useNavigate();

  return (
    <>
      <IconButton color="secondary" onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ color: "ivory" }} />
      </IconButton>
      <Box className="aiprop-chat-main-container">
        <Box>
          <Typography>The AI :</Typography>
        </Box>
        <Box className="aiprop-chat-airesponse-container">
          <Typography>Hello, assuming direct control...</Typography>
        </Box>
        <Box className="aiprop-chat-userprompt-container">
          <TextField
            sx={{ minWidth: "50rem" }}
            id="outlined-basic"
            label="Ask something !"
            variant="outlined"
          />
        </Box>
      </Box>
    </>
  );
}

export default Chat;
