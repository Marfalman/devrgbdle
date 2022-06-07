import React, { useState } from "react";

import AnswerDisplay from "./AnswerDisplay";
import Guesses from "./Guesses";
import Share from "./Share";

export default function Game() {
  const [guessNumber, setGuessNumber] = useState(1);
  const [gameStatus, setGameStatus] = useState("progress"); //win, lose, progress
  const [currCorrect, setCurrCorrect] = useState(false);
  const [allGuesses, setAllGuesses] = useState([]);

  const setWinLose = () => {};

  const formatScore = () => {};

  return (
    <div className="main">
      <Share final={allGuesses} number={guessNumber} />
      <AnswerDisplay status={gameStatus} />
      <Guesses number={guessNumber} />
    </div>
  );
}
