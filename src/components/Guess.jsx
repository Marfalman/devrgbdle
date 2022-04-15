import React from "react";
import { TextField, InputAdornment } from "@mui/material/";

export default function Guess() {
  return (
    <TextField
      label=""
      id="r-value"
      InputProps={{
        style: { fontSize: 40, color: "#2C2C2C" },
        startAdornment: (
          <InputAdornment position="start">
            <p style={{ fontSize: 25, color: "#929292" }}>R</p>
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
  );
}
