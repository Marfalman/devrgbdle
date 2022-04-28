import React, { useEffect, useState } from "react";
import Guess from "./Guess";
import { findFocus } from "../functions/FindFocus";

export default function Guesses(props) {
  const [gameOver, setGameOver] = useState(false);

  const logGuessNo = (guess) => {
    props.passGuessNo(guess.num + 1);
    console.log(guess.info);
  };

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
      />
      <Guess
        index={2}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
      />
      <Guess
        index={3}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
      />
      <Guess
        index={4}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
      />
      <Guess
        index={5}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
      />
      <Guess
        index={6}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
        passGuess={logGuessNo}
      />
    </div>
  );
}
