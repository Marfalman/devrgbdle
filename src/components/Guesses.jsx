import React, { useState } from "react";
import Guess from "./Guess";

export default function Guesses() {
  const [gameOver, setGameOver] = useState(false);

  return (
    <div>
      <Guess done={gameOver} passWin={setGameOver} />
      <Guess done={gameOver} passWin={setGameOver} />
      <Guess done={gameOver} passWin={setGameOver} />
      <Guess done={gameOver} passWin={setGameOver} />
      <Guess done={gameOver} passWin={setGameOver} />
      <Guess done={gameOver} passWin={setGameOver} />
    </div>
  );
}
