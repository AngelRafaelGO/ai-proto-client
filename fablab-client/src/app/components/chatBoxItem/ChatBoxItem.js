import { Box, Typography } from "@mui/material";
import React from "react";
import "./ChatBoxItem.css";

export default function ChatBoxItem({ txtPrompt, stylePlacement }) {
  return (
    <Box
      className="aiprop-chatboxelement-main-container"
      sx={
        stylePlacement == "right"
          ? { marginLeft: "auto" }
          : { marginRight: "auto" }
      }
    >
      <Box sx={{ textAlign: stylePlacement }}>
        <Typography>{txtPrompt}</Typography>
      </Box>
    </Box>
  );
}
