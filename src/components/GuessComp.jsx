import React, { useEffect, useState } from "react";
import { InputAdornment, Input } from "@mui/material/";

export default function GuessComp(props) {
  const [labelColor, setLabelColor] = useState("#929292");
  const [inputColor, setInputColor] = useState("#2C2C2C");

  useEffect(() => {
    if (props.bw !== "") {
      setLabelColor(props.bw);
      setInputColor(props.bw);
    }
  }, [props.bw]);

  return (
    <Input
      id={`${props.letter}-value`}
      type="number"
      sx={{
        fontSize: 40,
        color: inputColor,
        height: 40,
        margin: "0 5px",
        "&.Mui-disabled input": {
          color: labelColor,
          WebkitTextFillColor: labelColor,
        },
      }}
      startAdornment={
        <InputAdornment position="start">
          <p style={{ fontSize: 25, color: labelColor }}>{props.letter}</p>
        </InputAdornment>
      }
      inputProps={{ maxLength: 3, min: 0, max: 255 }}
      variant="standard"
      value={props.val}
      onChange={(e) => props.passVal(e.target.value)}
      disabled={props.disable}
    />
  );
}
