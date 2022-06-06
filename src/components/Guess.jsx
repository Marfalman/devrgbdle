import React, { useState, useContext } from "react";

import { Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";
import GuessComp from "./GuessComp";
import ColorToggle from "./ColorToggle";
import HintBtn from "./HintBtn";

export default function Guess(props) {
  const answerColor = useContext(TheColor);

  const [correct, setCorrect] = useState(false);
  const [R, setR] = useState(0);
  const [G, setG] = useState(0);
  const [B, setB] = useState(0);
  const [rgb, setRgb] = useState([]);
  const [close, setClose] = useState({});

  const [bwDisplay, setBwDisplay] = useState("");

  const checkGuess = () => {};
  const compareGuess = () => {};
  const calculateContrast = () => {};

  var letters = ["R", "G", "B"];
  var components = [];

  letters.forEach((letter, index) => {
    components.push(
      <GuessComp
        letter={letter}
        closeness={close[letter]}
        bw={bwDisplay}
        number={props.number}
        currentGuess={props.currNo}
        key={index}
      />
    );
  });

  return (
    <form className="guessForm">
      <div className="guessFormInner">
        <HintBtn number={props.number} passHintReq={compareGuess} />
        {components}
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
