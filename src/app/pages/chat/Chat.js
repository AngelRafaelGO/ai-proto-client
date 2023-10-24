import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Input, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBoxItem from "../../components/ChatBoxItem";
import "./Chat.css";

function Chat() {
  const navigate = useNavigate();
  const [chatBoxMsgArray, setChatBoxMsgArray] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleUserPrompt = (promptTxt) => {
    setChatBoxMsgArray([
      ...chatBoxMsgArray,
      <ChatBoxItem txtPrompt={promptTxt} stylePlacement={"right"} />,
    ]);
  };

  return (
    <>
      <IconButton color="secondary" onClick={() => navigate("/")}>
        <ArrowBackIcon sx={{ color: "ivory" }} />
      </IconButton>
      <Box className="aiprop-chat-main-container">
        <Box className="aiprop-chat-title-container">
          <Typography>Chat IA Trouve ton Avenir</Typography>
        </Box>
        <Box className="aiprop-chat-airesponse-container">
          {chatBoxMsgArray}
        </Box>
        <Box className="aiprop-chat-userprompt-container">
          <Input
            value={userInput ? userInput : ""}
            placeholder="Type anything!"
            sx={{ minWidth: "60rem" }}
            onChange={(event) => {
              setUserInput(event.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUserPrompt(e.target.value);
                setUserInput("");
              }
            }}
          />
        </Box>
        <Button
          onClick={() => {
            setChatBoxMsgArray([
              ...chatBoxMsgArray,
              <ChatBoxItem txtPrompt={"Oui"} stylePlacement={"left"} />,
            ]);
          }}
        >
          Générer réponse
        </Button>
      </Box>
    </>
  );
}

export default Chat;
