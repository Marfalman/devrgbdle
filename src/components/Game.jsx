import React, { useState, useEffect } from "react";

import AnswerDisplay from "./AnswerDisplay";
import Guesses from "./Guesses";
import Share from "./Share";
import { PlayerStats } from "./PlayerStats";
import { getSavedGuess, getTotalGuesses } from "../functions/StoreState";

export default function Game() {
  const [guessNumber, setGuessNumber] = useState(() => {
    const loaded = getSavedGuess();
    if (!loaded) {
      return 1;
    }
    return loaded;
  });
  const [gameStatus, setGameStatus] = useState("progress"); //win, lose, progress
  const [allGuesses, setAllGuesses] = useState(() => {
    const savedGuesses = getTotalGuesses();
    if (!savedGuesses) {
      return [];
    }
    return savedGuesses;
  });

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

  return (
    <div className="main">
      <PlayerStats final = {allGuesses} status = {gameStatus} />
      <Share final={allGuesses} status={gameStatus} />
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
