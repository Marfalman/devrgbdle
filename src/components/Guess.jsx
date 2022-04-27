import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import GuessComp from "./GuessComp";
import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";
import { findFocus } from "../functions/FindFocus";
import { calculateContrast } from "../functions/CalculateContrast";
import MouseOverPopover from "./MouseOverPopover";

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
      props.passGuess(props.index);
    }
  };

  const checkComponents = (color) => {
    const correctSplit = answerColor.split("(").pop();
    const correctArr = correctSplit.split(",");
    const threshold = 10;
    const answerArr = color.toString().split("(").pop().split(",");
    const closeObj = close;
    for (let i = 0; i < 3; i++) {
      const corrLetter = ["R", "G", "B"];
      const correctEl = correctArr[i];
      const answerEl = answerArr[i];
      const closeTo = correctEl - answerEl;
      const absClose = Math.abs(closeTo);
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
        <GuessComp
          letter={"R"}
          number={props.index}
          val={rVal}
          passVal={setRVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.R}
        />
        <GuessComp
          letter={"G"}
          val={gVal}
          passVal={setGVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.G}
        />
        <GuessComp
          letter={"B"}
          val={bVal}
          passVal={setBVal}
          disable={disableInputs}
          bw={contrast}
          closer={close.B}
        />
        <MouseOverPopover />
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
