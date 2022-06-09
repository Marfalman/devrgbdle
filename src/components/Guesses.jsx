import React, { useEffect } from "react";
import Guess from "./Guess";
import { findFocus } from "../functions/FindFocus";

export default function Guesses(props) {
  //props is used to pass info to/from Guess

  useEffect(() => {
    if (props.number <= 6) {
      findFocus(props.number);
    }
  }, [props.number]);

  var totalGuesses = 6;

  var guesses = [];

  for (var i = 1; i <= totalGuesses; i++) {
    guesses.push(
      <Guess
        currNo={props.number}
        number={i}
        key={i}
        passCorrect={props.passCorrect}
        passGuess={props.passGuess}
      />
    );
  }

  return <div>{guesses}</div>;
}
