import React, { useState, useEffect } from "react";

import AnswerDisplay from "./AnswerDisplay";
import Guesses from "./Guesses";
import Share from "./Share";

export default function Game() {
  const [guessNumber, setGuessNumber] = useState(1);
  const [gameStatus, setGameStatus] = useState("progress"); //win, lose, progress
  const [allGuesses, setAllGuesses] = useState([]);

  useEffect(() => {
    console.log(allGuesses);
  }, [allGuesses]);

  const setWinLose = (e) => {
    const correct = e;
    if (correct) {
      setGameStatus("win");
    } else {
      let newNum = guessNumber + 1;
      setGuessNumber(newNum);
    }
  };

  useEffect(() => {
    if (guessNumber > 6) {
      setGameStatus("lose");
    }
  }, [guessNumber]);

  const formatScore = () => {};

  return (
    <div className="main">
      <Share final={allGuesses} number={guessNumber} />
      <AnswerDisplay status={gameStatus} />
      <Guesses
        number={guessNumber}
        passCorrect={(e) => setWinLose(e)}
        passGuess={(e) => {
          setAllGuesses([...allGuesses, e]);
        }}
      />
    </div>
  );
}
