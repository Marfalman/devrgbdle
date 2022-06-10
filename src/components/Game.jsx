import React, { useState, useEffect } from "react";

import AnswerDisplay from "./AnswerDisplay";
import Guesses from "./Guesses";
import Share from "./Share";

export default function Game() {
  const [guessNumber, setGuessNumber] = useState(1);
  const [gameStatus, setGameStatus] = useState("progress"); //win, lose, progress
  const [allGuesses, setAllGuesses] = useState([]);

  const setWinLose = (e) => {
    const correct = e;
    if (correct) {
      setGameStatus("win");
      setGuessNumber(7);
    } else {
      let newNum = guessNumber + 1;
      setGuessNumber(newNum);
    }
  };

  useEffect(() => {
    if (guessNumber > 6 && gameStatus !== "win") {
      setGameStatus("lose");
    }
  }, [guessNumber, gameStatus]);

  const insertGuess = (e) => {
    let guesses = [...allGuesses];
    let guessIndex = guesses.findIndex((el) => el.num === e.num);
    if (guessIndex > -1) {
      guesses[guessIndex] = e;
    } else {
      guesses.push(e);
    }
    setAllGuesses(guesses);
  };

  const formatScore = () => {};

  return (
    <div className="main">
      <Share final={allGuesses} number={guessNumber} />
      <AnswerDisplay status={gameStatus} />
      <Guesses
        number={guessNumber}
        passCorrect={(e) => setWinLose(e)}
        passGuess={(e) => {
          insertGuess(e);
        }}
      />
    </div>
  );
}
