import React, { useEffect, useState } from "react";
import Guess from "./Guess";

export default function Guesses(props) {
  const [gameOver, setGameOver] = useState(false);

  const logGuessNo = (num) => {
    props.passGuessNo(num + 1);
  };

  useEffect(() => {
    const findFocus = () => {
      const letter = "R";
      const number = props.num;
      const focusEl = document.getElementById(`${number}-${letter}-value`);
      focusEl.focus();
    };
    if (props.num <= 6) {
      findFocus();
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
