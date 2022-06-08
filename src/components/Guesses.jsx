import React from "react";
import Guess from "./Guess";
//import find focus function here

export default function Guesses(props) {
  //props is used to pass info to/from Guess

  var totalGuesses = 6;

  var guesses = [];

  for (var i = 1; i <= totalGuesses; i++) {
    guesses.push(<Guess currNo={props.number} number={i} key={i} />);
  }

  return <div>{guesses}</div>;
}
