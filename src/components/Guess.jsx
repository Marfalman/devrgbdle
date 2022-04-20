import React, { useState, useEffect } from "react";
import GuessComp from "./GuessComp";

export default function Guess() {
  const [rVal, setRVal] = useState("");
  const [gVal, setGVal] = useState("");
  const [bVal, setBVal] = useState("");

  useEffect(() => {
    console.log(rVal);
  }, [rVal]);

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
      <GuessComp letter={"R"} val={rVal} passVal={setRVal} />
      <GuessComp letter={"G"} val={""} />
      <GuessComp letter={"B"} val={""} />
    </div>
  );
}
