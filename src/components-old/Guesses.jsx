import React, { useEffect, useState } from "react";
import Guess from "./Guess";
import { findFocus } from "../functions/FindFocus";

export default function Guesses(props) {
  const [gameOver, setGameOver] = useState(false);
  const [guessInfos, setGuessInfos] = useState([]);
  const [usedHints, setUsedHints] = useState([]);

  const logGuessNo = (guess) => {
    props.passGuessNo(guess.num + 1);
    if (guess.num === 6) {
      setGameOver(true);
    }
    const guesses = [...guessInfos];
    guesses.push(guess.info);
    setGuessInfos(guesses);
  };

  const logHints = (hint) => {
    const hints = [...usedHints];
    hints.push(hint);
    setUsedHints(hints);
  };

  useEffect(() => {
    if (gameOver) {
      const guessObj = { guesses: guessInfos, hints: usedHints };
      props.passGuessInfo(guessObj);
    }
  }, [gameOver, guessInfos, usedHints]); //eslint-disable-line

  useEffect(() => {
    if (props.num <= 6) {
      findFocus(props.num);
    }
  }, [props.num]);

  return (
    <div>
      <Guess
        index={1}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
      <Guess
        index={2}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
      <Guess
        index={3}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
      <Guess
        index={4}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
      <Guess
        index={5}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
      <Guess
        index={6}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
        passHints={logHints}
      />
    </div>
  );
}