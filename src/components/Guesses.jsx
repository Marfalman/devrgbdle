import React from "react";
import Guess from "./Guess";
//import find focus function here

export default function Guesses(props) {
  //props is used to pass info to/from Guess

  var guessNo = 6;

  var guesses = [];

  for (var i = 0; i < guessNo; i++) {
    guesses.push(<Guess currNo={props.number} number={i} key={i} />);
  }

  return <div>{guesses}</div>;
}
