import React from "react";
import { TextField, InputAdornment } from "@mui/material/";

export default function GuessComp(props) {
  return (
    <TextField
      id={`${props.letter}-value`}
      InputProps={{
        type: "number",
        style: { fontSize: 40, color: "#2C2C2C", height: 40, margin: "0 5px" },
        startAdornment: (
          <InputAdornment position="start">
            <p style={{ fontSize: 25, color: "#929292" }}>{props.letter}</p>
          </InputAdornment>
        ),
      }}
      inputProps={{ maxLength: 3, min: 0, max: 255 }}
      variant="standard"
    />
  );
}
