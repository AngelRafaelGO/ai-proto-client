import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Input,
  Button,
  Modal,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChatBoxItem from "../../components/chatBoxItem/ChatBoxItem";
import { getAiResponse } from "../../services/data.service";
import { predefinedQuestions } from "../../tools/predefinedQuestions";
import IaLoading from "../../components/iaLoading/AiLoading";
import ia_pet from "../../assets/ai_pet.png";
import "./Chat.css";

// Mui toast component
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const getResponseFromAi = async (promptTxt) => {
    setAiResponseLoading(true);
    const response = await getAiResponse(promptTxt);
    return "the-response-from-the-ai";
  };

  const addElementToChatBox = (txt, placement) => {
    setChatBoxMsgArray((chatBoxMsgArray) => [
      ...chatBoxMsgArray,
      <ChatBoxItem txtPrompt={txt} stylePlacement={placement} />,
    ]);
  };

  const handleUserPrompt = async (promptTxt) => {
    if (promptTxt == "") {
      // console.log("display toast");
      setToastOpen(true);
    } else {
      if (firstLoadAutoPrompt === true) {
        setFirstLoadAutoPrompt(false);
      }

      addElementToChatBox(promptTxt, "right");
      const aiResponse = await getResponseFromAi(promptTxt);
      addElementToChatBox(aiResponse, "left");
      setAiResponseLoading(false);
    }
  };

  const handleInsertQuestion = (questionTxt) => {
    handleUserPrompt(questionTxt);
    handleClose();
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

  return (
    <>
      <Box className="aiprop-chat-main-container">
        <Box className="aiprop-chat-title-container">
          <Box sx={{ position: "absolute", left: "5rem" }}>
            <IconButton color="secondary" onClick={() => navigate("/")}>
              <ArrowBackIcon sx={{ color: "ivory" }} />
            </IconButton>
          </Box>
          <Box sx={{ position: "absolute", right: "5rem" }}>
            <Button
              sx={{ backgroundColor: "#2C5E2E" }}
              onClick={() => navigate("/stats")}
            >
              Stats
            </Button>
          </Box>
          <Box
            component="img"
            sx={{
              height: "4rem",
              width: "4rem",
              marginRight: "1rem",
            }}
            alt="la mascotte d'IASup"
            src={ia_pet}
          />
          <Typography sx={{ marginBottom: "1rem" }}>
            Posez vos questions ici, je vous réponderai de mon mieux
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
                Cliquez ici
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
          <Box sx={{ marginLeft: "49%" }}>
            <Button
              sx={{ marginTop: "0.5rem" }}
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
            placeholder="écrivez ici !"
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
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="aiprop-chat-questions-modal">
            <Box>
              <Typography
                sx={{ marginBottom: "2rem" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Voici quelques idées pour bien démarer
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
    </>
  );
}

export default Chat;
