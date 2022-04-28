import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import GuessComp from "./GuessComp";
import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";
import { findFocus } from "../functions/FindFocus";
import { calculateContrast } from "../functions/CalculateContrast";
import HintBtn from "./HintBtn";

const useStyles = makeStyles({
  enterBtn: {
    display: "none",
    "@media (max-width: 780px)": {
      display: "block",
    },
  },
});

export default function Guess(props) {
  const classes = useStyles();

  const answerColor = useContext(TheColor);

  const [rVal, setRVal] = useState("");
  const [gVal, setGVal] = useState("");
  const [bVal, setBVal] = useState("");
  const [rgb, setRgb] = useState("rgba(255,255,255,1)");
  const [contrast, setContrast] = useState("");
  const [disableInputs, setDisableInputs] = useState(false);
  const [win, setWin] = useState(false);
  const [borderColor, setBorderColor] = useState("#CDD0D5");
  const [close, setClose] = useState({ R: "null", G: "null", B: "null" });
  const [hints, setHints] = useState({ R: "null", G: "null", B: "null" });
  const [showHints, setShowHints] = useState(false);

  useEffect(() => {
    if (rVal < 0) {
      setRVal(0);
    }
    if (rVal > 255) {
      setRVal(255);
    }
    if (gVal < 0) {
      setGVal(0);
    }
    if (gVal > 255) {
      setGVal(255);
    }
    if (bVal < 0) {
      setBVal(0);
    }
    if (bVal > 255) {
      setBVal(255);
    }
  }, [rVal, gVal, bVal]);

  useEffect(() => {
    if (props.done) {
      setDisableInputs(true);
    } else if (props.index !== props.focus) {
      setDisableInputs(true);
    } else if (props.index === props.focus && !props.done) {
      setDisableInputs(false);
    }
  }, [props]);

  useEffect(() => {
    if (props.focus <= 6) {
      findFocus(props.focus);
    }
  }, [disableInputs, props.focus]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    var validated = await validateForm();
    if (validated) {
      var newRGB = await setField();
      matchColor(newRGB);
      checkComponents(newRGB);
    }
  };

  const validateForm = async () => {
    if (!rVal || !gVal || !bVal) {
      setBorderColor("red");
      findFocus(props.focus);
      return false;
    } else {
      setBorderColor("#CDD0D5");
      return true;
    }
  };

  const setField = async function () {
    return new Promise((resolve) => {
      const rgb = `rgba(${rVal},${gVal},${bVal},1)`;
      setRgb(rgb);
      setDisableInputs(true);
      const contrastVal = calculateContrast([rVal, bVal, gVal]);
      setContrast(contrastVal);
      resolve(rgb);
    });
  };

  const matchColor = (color) => {
    if (answerColor === color) {
      setWin(true);
      setBorderColor(answerColor);
      props.passWin(true);
    } else {
      props.passGuess({
        num: props.index,
        info: { sym: close, hints: showHints },
      });
    }
  };

  const checkComponents = (color) => {
    const correctSplit = answerColor.split("(").pop();
    const correctArr = correctSplit.split(",");
    const threshold = 10;
    const answerArr = color.toString().split("(").pop().split(",");
    const closeObj = close;
    const hintObj = hints;
    for (let i = 0; i < 3; i++) {
      const corrLetter = ["R", "G", "B"];
      const correctEl = correctArr[i];
      const answerEl = answerArr[i];
      const closeTo = correctEl - answerEl;
      const absClose = Math.abs(closeTo);
      if (closeTo < 0) {
        hintObj[corrLetter[i]] = "down";
      } else if (closeTo > 0) {
        hintObj[corrLetter[i]] = "up";
      }
      if (absClose <= threshold) {
        if (closeTo === 0) {
          closeObj[corrLetter[i]] = "correct";
        } else if (closeTo < 0) {
          closeObj[corrLetter[i]] = "down";
        } else if (closeTo > 0) {
          closeObj[corrLetter[i]] = "up";
        }
      }
    }
    setClose(closeObj);
    setHints(hintObj);
  };

  return (
    <form
      onSubmit={onFormSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      id={`guess-${props.index}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: 384,
          height: 70,
          border: `${disableInputs ? 3 : 4}px solid ${borderColor}`,
          margin: "6px 0",
          backgroundColor: rgb,
        }}
      >
        {props.index === props.focus - 1 && props.index < 6 && (
          <HintBtn passChildHint={setShowHints} />
        )}
        <GuessComp
          letter={"R"}
          number={props.index}
          val={rVal}
          passVal={setRVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.R}
          hint={hints.R}
          showHint={showHints}
        />
        <GuessComp
          letter={"G"}
          val={gVal}
          passVal={setGVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.G}
          hint={hints.G}
          showHint={showHints}
        />
        <GuessComp
          letter={"B"}
          val={bVal}
          passVal={setBVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.B}
          hint={hints.B}
          showHint={showHints}
        />

        <div className={classes.enterBtn}>
          <Button type="submit" variant="contained" color="grey">
            Submit
          </Button>
        </div>
      </div>

      <ConfettiEl confetti={win} />
    </form>
  );
}
