import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

export default function HintBtn(props) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const curGuessComp = document.getElementById(`guess-${props.num}`);
    const compAttr = curGuessComp.getBoundingClientRect();
    const compLeft = compAttr.left - 10;
    setLeft(compLeft);
    const compTop = compAttr.top;
    const compHeight = compAttr.height;
    const topPos = compHeight / 2 + compTop - 10;
    setTop(topPos);
  }, [props.num]);

  const showBtn = () => {
    setShow(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: top - 25,
        left: left - 70,
        width: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      {show && (
        <Button
          variant="outlined"
          style={{
            borderColor: "#CDD0D5",
            color: "#CDD0D5",
          }}
        >
          Hint?
        </Button>
      )}
      <button
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#CDD0D5",
        }}
        onFocus={showBtn}
        onMouseOver={showBtn}
      ></button>
    </div>
  );
}
