import { Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/landing/Landing";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
