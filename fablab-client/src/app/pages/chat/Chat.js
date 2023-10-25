import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Input,
  Button,
  Modal,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBoxItem from "../../components/chatBoxItem/ChatBoxItem";
import IaLoading from "../../components/iaLoading/AiLoading";
import "./Chat.css";
import { getAiResponse } from "../../services/data.service";
import { predefinedQuestions } from "../../tools/predefinedQuestions";

function Chat() {
  const navigate = useNavigate();
  const [chatBoxMsgArray, setChatBoxMsgArray] = useState([
    <Box className="aiprop-chatboxelement-main-container">
      <Box sx={{ textAlign: "left" }}>
        <Typography>Bonjour ! Comment puis je vous aider ?</Typography>
      </Box>
    </Box>,
  ]);
  const [userInput, setUserInput] = useState("");
  const [aiResponseLoading, setAiResponseLoading] = useState(false);
  const [firstLoadAutoPrompt, setFirstLoadAutoPrompt] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getResponseFromAi = async () => {
    setAiResponseLoading(true);
    const response = await getAiResponse(userInput);
    // Insert 'if' here to verify http status = 200
    console.log(response);
  };

  const handleUserPrompt = async (promptTxt) => {
    if (firstLoadAutoPrompt === true) {
      setFirstLoadAutoPrompt(false);
    }

    setChatBoxMsgArray([
      ...chatBoxMsgArray,
      <ChatBoxItem txtPrompt={promptTxt} stylePlacement={"right"} />,
    ]);

    const aiResponse = await getResponseFromAi();
    setChatBoxMsgArray([
      ...chatBoxMsgArray,
      <ChatBoxItem txtPrompt={aiResponse} stylePlacement={"left"} />,
    ]);
    setAiResponseLoading(false);
  };

  const handleInsertQuestion = (questionTxt) => {
    handleUserPrompt(questionTxt);
    handleClose();
  };

  return (
    <>
      <Box className="aiprop-chat-backBtn">
        <IconButton
          color="secondary"
          className="aiprop-chat-backBtn"
          onClick={() => navigate("/")}
        >
          <ArrowBackIcon sx={{ color: "ivory" }} />
        </IconButton>
      </Box>
      <Box className="aiprop-chat-main-container">
        <Box className="aiprop-chat-title-container">
          <Typography>
            Posez vos questions ici, l'IA te répondera de son mieux
          </Typography>
        </Box>
        <Box className="aiprop-chat-airesponse-container">
          {chatBoxMsgArray}
          {firstLoadAutoPrompt ? (
            <Box sx={{ textAlign: "right" }}>
              <Typography>Pas de questions en tête ?</Typography>
              <Button
                sx={{ marginLeft: "1rem", textAlign: "left" }}
                className="aiprop-chat-question-btn"
                onClick={() => handleOpen()}
              >
                Click ici
              </Button>
            </Box>
          ) : (
            ""
          )}
          {aiResponseLoading ? <IaLoading /> : ""}
        </Box>
        {firstLoadAutoPrompt ? (
          ""
        ) : (
          <Box>
            <Button
              sx={{ marginLeft: "1rem" }}
              className="aiprop-chat-question-btn"
              onClick={() => handleOpen()}
            >
              Revoir les questions
            </Button>
          </Box>
        )}
        <Box className="aiprop-chat-userprompt-container">
          <Input
            value={userInput ? userInput : ""}
            placeholder="écris ici !"
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="aiprop-chat-questions-modal">
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
            </Box>
            {predefinedQuestions.map((item) => (
              <Button
                onClick={() => {
                  handleInsertQuestion(item.questionTxt);
                }}
              >
                {item.questionTxt}
              </Button>
            ))}
          </Box>
        </Modal>
      </Box>
    </>
  );
}

export default Chat;
