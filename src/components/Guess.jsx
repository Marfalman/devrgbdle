import React from "react";
import GuessComp from "./GuessComp";

export default function Guess() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: 384,
        height: 70,
        border: "3px solid #CDD0D5",
        margin: "6px 0",
      }}
    >
      <GuessComp letter={"R"} />
      <GuessComp letter={"G"} />
      <GuessComp letter={"B"} />
    </div>
  );
}
