import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Logo from "./components/Logo";
import TrueColor from "./components/TrueColor";
import Guesses from "./components/Guesses";
import HelpModal from "./components/HelpModal";

import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [guessNum, setGuessNum] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <div className="App">
      <CssBaseline />
      <IconButton style={{ position: "fixed" }} onClick={openModal}>
        <HelpIcon />
      </IconButton>
      <HelpModal open={modalOpen} passModalOpen={setModalOpen} />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Logo />
        <TrueColor />
        <Guesses num={guessNum} />
      </div>
    </div>
  );
}

export default App;
