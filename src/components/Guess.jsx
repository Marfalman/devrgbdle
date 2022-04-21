import React, { useState, useEffect, useContext } from "react";
import GuessComp from "./GuessComp";
import { TheColor } from "./TheColor";
import ConfettiEl from "./ConfettiEl";

export default function Guess(props) {
  const answerColor = useContext(TheColor);
  const [rVal, setRVal] = useState("");
  const [gVal, setGVal] = useState("");
  const [bVal, setBVal] = useState("");
  const [rgb, setRgb] = useState("rgba(255, 255, 255, 1)");
  const [contrast, setContrast] = useState("");
  const [disableInputs, setDisableInputs] = useState(false);
  const [win, setWin] = useState(false);
  const [borderColor, setBorderColor] = useState("#CDD0D5");

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
    }
  }, [props.done]);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    var newRGB = await setField();
    matchColor(newRGB);
  };

  const setField = async function () {
    return new Promise((resolve) => {
      const rgb = `rgba(${rVal}, ${gVal}, ${bVal}, 1)`;
      setRgb(rgb);
      setDisableInputs(true);
      calculateContrast();
      resolve(rgb);
    });
  };

  const calculateContrast = () => {
    //from here: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
    const rgbArr = [rVal, bVal, gVal];
    const adjArr = [];
    rgbArr.forEach((color) => {
      color = color / 255;
      if (color <= 0.03928) {
        color = color / 12.92;
      } else {
        color = ((color + 0.055) / 1.055) ^ 2.4;
      }
      adjArr.push(color);
    });
    let luminance =
      0.2126 * adjArr[0] + 0.7152 * adjArr[1] + 0.0722 * adjArr[2];
    if (luminance > 0.179) {
      setContrast("black");
    } else {
      setContrast("white");
    }
  };

  const matchColor = (color) => {
    if (answerColor === color) {
      setWin(true);
      setBorderColor(answerColor);
      props.passWin(true);
    }
  };

  return (
    <form
      onSubmit={onFormSubmit}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: 384,
          height: 70,
          border: `3px solid ${borderColor}`,
          margin: "6px 0",
          backgroundColor: rgb,
        }}
      >
        <GuessComp
          letter={"R"}
          val={rVal}
          passVal={setRVal}
          disable={disableInputs}
          bw={contrast}
        />
        <GuessComp
          letter={"G"}
          val={gVal}
          passVal={setGVal}
          disable={disableInputs}
          bw={contrast}
        />
        <GuessComp
          letter={"B"}
          val={bVal}
          passVal={setBVal}
          disable={disableInputs}
          bw={contrast}
        />
        <button type="submit" style={{ display: "none" }}>
          Submit
        </button>
      </div>
      <ConfettiEl confetti={win} />
    </form>
  );
}
