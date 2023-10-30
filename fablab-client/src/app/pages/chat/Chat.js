import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import HomeIcon from "@mui/icons-material/Home";
import ChatBoxItem from "../../components/chatBoxItem/ChatBoxItem";
import ChatBoxIaItem from "../../components/chatBoxIAItem/ChatBoxIaItem";
import {
  getAiResponse,
  getInitialAiResponse,
} from "../../services/data.service";
import { predefinedQuestions } from "../../tools/predefinedQuestions";
import IaLoading from "../../components/iaLoading/AiLoading";
import ia_pet from "../../assets/ai_pet.png";
import "./Chat.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Chat() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [chatBoxMsgArray, setChatBoxMsgArray] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiResponseLoading, setAiResponseLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState();
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const getResponseFromAi = async (promptTxt) => {
    setAiResponseLoading(true);
    const response = await getAiResponse(promptTxt);
    return response.text;
  };

  const addElementToChatBox = (txt, placement) => {
    if (placement == "left") {
      setChatBoxMsgArray((chatBoxMsgArray) => [
        ...chatBoxMsgArray,
        <ChatBoxIaItem txtPrompt={txt} stylePlacement={placement} />,
      ]);
    } else {
      setChatBoxMsgArray((chatBoxMsgArray) => [
        ...chatBoxMsgArray,
        <ChatBoxItem txtPrompt={txt} stylePlacement={placement} />,
      ]);
    }
  };

  const handleUserPrompt = async (promptTxt) => {
    if (promptTxt == "") {
      setToastOpen(true);
    } else {
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

  const getFirstAiResponse = async () => {
    if (userData != undefined) {
      const firstAiResponse = await getInitialAiResponse(userData);
      addElementToChatBox(firstAiResponse.text, "left");
      setAiResponseLoading(false);
    }
  };

  useEffect(() => {
    if (loading === true) {
      getFirstAiResponse();
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (state === null) {
      navigate("/");
    } else {
      const {
        userName,
        userAge,
        userInterests,
        userInterestsPro,
        userStudies,
        userLocation,
      } = state;

      setUserData({
        userName,
        userAge,
        userInterests,
        userInterestsPro,
        userStudies,
        userLocation,
      });

      setLoading(true);
    }
  }, []);

  return (
    <>
      <Box className="aiprop-chat-main-container">
        <Box className="aiprop-chat-title-container">
          <Box sx={{ position: "absolute", left: "5rem" }}>
            <IconButton color="secondary" onClick={() => navigate("/")}>
              <HomeIcon sx={{ color: "ivory" }} />
            </IconButton>
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
          {aiResponseLoading ? <IaLoading /> : ""}
        </Box>
        <Box sx={{ marginLeft: "49%" }}>
          <Button
            sx={{ marginTop: "0.5rem" }}
            className="aiprop-chat-question-btn"
            onClick={() => handleOpen()}
          >
            Pas d'idée ? Clique ici !
          </Button>
        </Box>
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
                Voici quelques idées si vous ne savez pas quoi demander
              </Typography>
            </Box>
            {predefinedQuestions.map((item, i) => (
              <Button
                key={i}
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
