import React, { useState, useEffect } from "react";
import GuessComp from "./GuessComp";

export default function Guess() {
  const [rVal, setRVal] = useState("");
  const [gVal, setGVal] = useState("");
  const [bVal, setBVal] = useState("");
  const [rgb, setRgb] = useState("rgba(255, 255, 255, 1)");
  const [contrast, setContrast] = useState("");

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

  const [disableInputs, setDisableInputs] = useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    setRgb(`rgba(${rVal}, ${gVal}, ${bVal}, 1)`);
    setDisableInputs(true);
    calculateContrast();
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
    // if L > 0.179 use #000000 else use #ffffff
    //     for each c in r,g,b:
    //     c = c / 255.0
    //     if c <= 0.03928 then c = c/12.92 else c = ((c+0.055)/1.055) ^ 2.4
    // L = 0.2126 * r + 0.7152 * g + 0.0722 * b
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: 384,
          height: 70,
          border: "3px solid #CDD0D5",
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
    </form>
  );
}
