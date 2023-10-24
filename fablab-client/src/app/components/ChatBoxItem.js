import { Box, Typography } from "@mui/material";
import React from "react";
import "./ChatBoxItem.css";

function ChatBoxItem({ txtPrompt, stylePlacement }) {
  return (
    <Box className="aiprop-chatboxelement-main-container">
      <Box sx={{ textAlign: stylePlacement }}>
        <Typography>{txtPrompt}</Typography>
      </Box>
    </Box>
  );
}

export default ChatBoxItem;
