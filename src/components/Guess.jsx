import React, { useState, useContext, useEffect } from "react";

import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";
import GuessComp from "./GuessComp";
import ColorToggle from "./ColorToggle";
import HintBtn from "./HintBtn";

import { calculateContrast } from "../functions/CalculateContrast";

export default function Guess(props) {
  const answerColor = useContext(TheColor);

  const [correct, setCorrect] = useState(false);
  const [R, setR] = useState("");
  const [G, setG] = useState("");
  const [B, setB] = useState("");
  const [rgb, setRgb] = useState("");
  const [close, setClose] = useState({});

  const [bwDisplay, setBwDisplay] = useState("");

  useEffect(() => {
    setRgb(`rgba(${R},${G},${B},1)`);
  }, [R, G, B]);

  const handleSubmit = (e) => {
    e.preventDefault();
    checkGuess();
    compareGuess(false);
    const contrastVal = calculateContrast([R, G, B]);
    setBwDisplay(contrastVal);
  };

  const checkGuess = () => {
    if (rgb === answerColor) {
      setCorrect(true);
    }
  };

  const compareGuess = (hint) => {
    const closeObj = { R: "", G: "", B: "", hints: false };
    if (hint) {
    } else {
      const correctSplit = answerColor.split("(").pop();
      const correctArr = correctSplit.split(",");
      const threshold = 10;
      const answerArr = [R, G, B];
      const letters = ["R", "G", "B"];
      for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let answerVal = answerArr[i];
        let correctVal = correctArr[i];
        if (answerVal === correctVal) {
          closeObj[letter] = "correct";
        }
        let diff = answerVal - correctVal;
        if (Math.abs(diff) <= threshold) {
          if (diff < 0) {
            closeObj[letter] = "up";
          } else if (diff > 0) {
            closeObj[letter] = "down";
          }
        }
      }
    }
    setClose(closeObj);
  };

  const calculateContrast = () => {};

  function setVal(letter, val) {
    if (val < 0) {
      val = 0;
    } else if (val > 255) {
      val = 255;
    }
    if (letter === "R") {
      setR(val);
    } else if (letter === "G") {
      setG(val);
    } else if (letter === "B") {
      setB(val);
    }
  }

  return (
    <form
      className="guessForm"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="guessFormInner">
        <HintBtn number={props.number} passHintReq={compareGuess} />
        <GuessComp
          letter={"R"}
          closeness={close[R]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("R", e);
          }}
          val={R}
        />
        <GuessComp
          letter={"G"}
          closeness={close[G]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("G", e);
          }}
          val={G}
        />
        <GuessComp
          letter={"B"}
          closeness={close[B]}
          bw={bwDisplay}
          number={props.number}
          currentGuess={props.currNo}
          passVal={(e) => {
            setVal("B", e);
          }}
          val={B}
        />
        <div className="enterBtn">
          <Button
            type="submit"
            variant="contained"
            color="grey"
            size="small"
            style={{ minWidth: "fit-content" }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </Button>
        </div>
        <ColorToggle contrast={bwDisplay} passContrast={setBwDisplay} />
      </div>
      <ConfettiEl show={correct} />
    </form>
  );
}
