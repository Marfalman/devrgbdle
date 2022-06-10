import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize, Typography } from "@mui/material";
import { TheDay } from "./TheColor";

export default function Share(props) {
  //props: final (guesses), status
  const url = "https://www.rgbdle.page/";

  // const [shown, setShown] = useState(false);

  // useEffect(() => {
  //   if (props.status !== "progress") {
  //     setShown(true);
  //   }
  // }, [props.status]);

  const getWin = (guesses) => {
    let lastGuess = guesses[guesses.length - 1];
    if (
      lastGuess.R === "correct" &&
      lastGuess.G === "correct" &&
      lastGuess.B === "correct"
    ) {
      return lastGuess.num;
    } else {
      return "X";
    }
  };

  const formatScore = (guesses) => {
    const scoreArr = [];
    guesses.forEach((guess) => {
      const guessArr = [];
      for (const key in guess) {
        if (key !== "num" && key !== "hints") {
          let emoji = strToEmoji[guess[key]];
          guessArr.push(emoji);
        }
        if (key === "hints" && guess[key] === true) {
          let emoji = strToEmoji[key];
          guessArr.push(emoji);
        }
      }
      const guessStr = guessArr.join("");
      scoreArr.push(guessStr);
    });
    const scoreStr = scoreArr.join("\n");
    return scoreStr;
  };

  const strToEmoji = {
    "": "❌",
    down: "⬇️",
    "hint-down": "⬇️",
    up: "⬆️",
    "hint-up": "⬆️",
    correct: "✅",
    hints: "💡",
  };

  const shareString = () => {
    const loseWin = getWin(props.final);
    const emojis = formatScore(props.final);
    const dayNo = TheDay._currentValue;
    const finalStr = `RGBdle ${dayNo}: ${loseWin}/6\n${emojis}\n${url}`;
    console.log(finalStr);
  };

  return (
    <div
      className="shareArea"
      // style={{
      //   opacity: shown ? 100 : 0,
      // }}
    >
      <Button
        variant="contained"
        color="grey"
        onClick={shareString}
        onTouchEnd={shareString}
        style={{ cursor: "pointer" }}
      >
        Share
      </Button>
      <Typography sx={{ p: 1 }}>Thanks for playing</Typography>
    </div>
  );
}
