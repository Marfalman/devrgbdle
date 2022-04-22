import React, { useState } from "react";
import Guess from "./Guess";

export default function Guesses(props) {
  const [gameOver, setGameOver] = useState(false);

  return (
    <div>
      <Guess
        index={1}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
      <Guess
        index={2}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
      <Guess
        index={3}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
      <Guess
        index={4}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
      <Guess
        index={5}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
      <Guess
        index={6}
        focus={props.num}
        done={gameOver}
        passWin={setGameOver}
      />
    </div>
  );
}
