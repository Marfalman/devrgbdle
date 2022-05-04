import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Logo from "./components/Logo";
import Answer from "./components/Answer";
import Guesses from "./components/Guesses";
import HelpModal from "./components/HelpModal";
import ShareBtn from "./components/ShareBtn";
import "./App.css";

import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";

import { displayGuesses } from "./functions/DisplayGuesses";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [guessNum, setGuessNum] = useState(1);
  const [lose, setLose] = useState(false);
  const [guesses, setGuesses] = useState({});
  const [finalAns, setFinalAns] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (guesses) {
      const guessStr = displayGuesses(guesses);
      setFinalAns(guessStr);
    }
  }, [guesses]);

  useEffect(() => {
    if (guessNum > 6) {
      setLose(true);
    }
  }, [guessNum]);

  return (
    <div className="App">
      <CssBaseline />
      <IconButton style={{ position: "fixed" }} onClick={openModal}>
        <HelpIcon />
      </IconButton>
      <HelpModal open={modalOpen} passModalOpen={setModalOpen} />
      <div className="main">
        <Logo />
        <ShareBtn final={finalAns} />
        <Answer lose={lose.toString()} />
        <Guesses
          num={guessNum}
          passGuessNo={setGuessNum}
          passGuessInfo={setGuesses}
        />
      </div>
    </div>
  );
}

export default App;
