import React, { useState } from "react";
import { Box, Button, Typography, Modal, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import "./ChatBoxIaItem.css";
import { sendUsefulnessAnswer } from "../../services/data.service";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChatBoxIaItem({ txtPrompt, stylePlacement }) {
  const [toastOpen, setToastOpen] = useState(false);

  const handleUsefulnessAnswer = async (answer) => {
    const response = await sendUsefulnessAnswer(answer);
    if (response === true) {
      setToastOpen(true);
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen(false);
  };

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
      <Box>
        <Typography sx={{ fontSize: "0.7em" }}>
          Ma réponse, est elle pértinente ?
        </Typography>
        <Box className="iaprop-chatboxelement-btn-container">
          <Button onClick={() => handleUsefulnessAnswer(true)}>Oui</Button>
          <Button onClick={() => handleUsefulnessAnswer(false)}>Non</Button>
        </Box>
      </Box>
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Merci de votre retour !
        </Alert>
      </Snackbar>
    </Box>
  );
}
