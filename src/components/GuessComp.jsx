import React, { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material/";

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
    <TextField
      id={`${props.letter}-value`}
      InputProps={{
        type: "number",
        style: {
          fontSize: 40,
          color: inputColor,
          height: 40,
          margin: "0 5px",
          "&$disabled": {
            borderColor: "orange",
          },
        },
        startAdornment: (
          <InputAdornment position="start">
            <p style={{ fontSize: 25, color: labelColor }}>{props.letter}</p>
          </InputAdornment>
        ),
      }}
      inputProps={{ maxLength: 3, min: 0, max: 255 }}
      variant="standard"
      value={props.val}
      onChange={(e) => props.passVal(e.target.value)}
      disabled={props.disable}
    />
  );
}
