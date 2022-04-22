import React, { useState, useEffect, useContext } from "react";
import GuessComp from "./GuessComp";
import { TheColor } from "./TheColor";

export default function StaticGuess(props) {
  const [rgba, setRgba] = useState("");
  const [contrast, setContrast] = useState("");

  useEffect(() => {
    const calculateContrast = () => {
      //from here: https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
      const rgbArr = props.colors;
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
    calculateContrast();
    const calculatedRgba = `rgba(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]}, 1)`;
    setRgba(calculatedRgba);
  }, [props.colors]);

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: 384,
          height: 70,
          marginBottom: 6,
          border: `3px solid ${rgba}`,
          backgroundColor: rgba,
        }}
      >
        <GuessComp
          letter={"R"}
          number={props.index}
          val={props.colors[0]}
          disable={true}
          bw={contrast}
        />
        <GuessComp
          letter={"G"}
          val={props.colors[1]}
          disable={true}
          bw={contrast}
        />
        <GuessComp
          letter={"B"}
          val={props.colors[2]}
          disable={true}
          bw={contrast}
        />
      </div>
    </form>
  );
}
