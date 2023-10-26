import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Landing from "./pages/landing/Landing";
import Chat from "./pages/chat/Chat";
import Stats from "./pages/stats/Stats";
import "./App.css";

const customTheme = createTheme({
  typography: {
    fontFamily: `"Roboto Mono", "monospace"`,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "Roboto Mono", "monospace";
          font-style: normal;
          font-display: swap;
          font-weight: 200;
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
  palette: {
    primary: {
      main: "#F2F1E9",
    },
    secondary: {
      main: "#2a2826",
    },
    background: {
      default: "#413124",
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
        <Route path="/stats" element={<Stats />} />
      </Routes>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
