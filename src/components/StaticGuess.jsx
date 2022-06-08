import React, { useState, useEffect } from "react";
import GuessComp from "./GuessComp";
import { calculateContrast } from "../functions/CalculateContrast";

export default function StaticGuess(props) {
  const [rgba, setRgba] = useState("");
  const [contrast, setContrast] = useState("");

  useEffect(() => {
    const contrastVal = calculateContrast(props.colors);
    setContrast(contrastVal);
    const calculatedRgba = `rgba(${props.colors[0]}, ${props.colors[1]}, ${props.colors[2]}, 1)`;
    setRgba(calculatedRgba);
  }, [props.colors]);

  return (
    <form className="guessForm">
      <div className="guessFormInner">
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
