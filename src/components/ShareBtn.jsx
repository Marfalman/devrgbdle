import React, { useState, useEffect } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { TheDay } from "./TheColor";
import { Typography } from "@mui/material";

const url = "https://main.d2qu9x7ue9yf75.amplifyapp.com/";

export default function ShareBtn(props) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const [noClipboard, setNoClipboard] = useState(false);
  const [string, setString] = useState("");

  useEffect(() => {
    if (props.final.length > 0) {
      setShown(100);
    }
  }, [props.final]);

  //day number
  const dayNo = TheDay._currentValue;

  //clipboard stuff
  const copyAns = () => {
    //I NEED A BETTER WAY OF DOING THIS
    const finalArr = props.final;
    let lost = true;
    if (finalArr.length === 6) {
      const finalAnsStr = finalArr[5].join("");
      if (finalAnsStr === "✅✅✅" || finalAnsStr === "✅✅✅💡") {
        lost = false;
      }
    } else lost = false;
    const stringArr = [];
    stringArr.push(`RGBdle ${dayNo}: ${lost ? "X" : props.final.length}/6 \n`);
    finalArr.forEach((el) => {
      const string = el.join(" ");
      stringArr.push(string);
    });
    stringArr.push(`\n${url}`);
    const finalStr = stringArr.join("\n");
    setString(finalStr);

    copyToClipBoard(finalStr);
  };

  //from here: https://www.delftstack.com/howto/javascript/javascript-copy-to-clipboard/
  function copyToClipBoard(content) {
    try {
      navigator.clipboard
        .writeText(content)
        .then(setOpen(true))
        .catch((err) => {
          console.log("Something went wrong", err);
          setNoClipboard(true);
        });
    } catch (error) {
      setNoClipboard(true);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity: shown,
      }}
    >
      <Button
        variant="contained"
        color="grey"
        onClick={copyAns}
        onTouchEnd={copyAns}
        style={{ cursor: "pointer" }}
      >
        Share
      </Button>
      <Typography sx={{ p: 1 }}>
        {open && "Content copied to clipboard."}
        {!open && !noClipboard && "Thanks for playing."}
      </Typography>
      {noClipboard && (
        <TextareaAutosize value={string} style={{ marginBottom: ".5rem" }} />
      )}
    </div>
  );
}
