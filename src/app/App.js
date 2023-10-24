import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from "./pages/landing/Landing";
import Chat from "./pages/chat/Chat";
import "./App.css";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#F2F1E9",
    },
    secondary: {
      main: "#2a2826",
    },
    background: {
      default: "#968870",
    },
    text: {
      primary: "#F2F1E9",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
