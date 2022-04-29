import React from "react";
import { Button } from "@mui/material";

export default function ShareBtn(props) {
  const copyAns = () => {
    const finalArr = props.final;
    const stringArr = [];
    stringArr.push(`RGBdle [number]: ${props.final.length}/6 \n`);
    finalArr.forEach((el) => {
      const string = el.join(" ");
      stringArr.push(string);
    });
    stringArr.push("\n[url here]");
    const finalStr = stringArr.join("\n");
    copyToClipBoard(finalStr);
  };

  //from here: https://www.delftstack.com/howto/javascript/javascript-copy-to-clipboard/
  function copyToClipBoard(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Text copied to clipboard...");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }

  if (props.final.length > 0) {
    return (
      <Button
        variant="contained"
        color="grey"
        style={{ marginBottom: "1rem" }}
        onClick={copyAns}
      >
        Share
      </Button>
    );
  } else {
    return (
      <Button disabled style={{ opacity: 0, marginBottom: "1rem" }}>
        Nothing
      </Button>
    );
  }
}
