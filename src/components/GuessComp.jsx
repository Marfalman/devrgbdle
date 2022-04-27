import React, { useEffect, useState } from "react";
import { InputAdornment, Input } from "@mui/material/";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";

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
    <div>
      <Input
        id={`${props.number}-${props.letter}-value`}
        type="number"
        sx={{
          fontSize: props.disable ? 30 : 40,
          color: inputColor,
          height: 40,
          margin: "0 5px",
          "&.Mui-disabled input": {
            color: labelColor,
            WebkitTextFillColor: labelColor,
          },
          "& .MuiInput-input": {
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
            },
          },
        }}
        startAdornment={
          <InputAdornment position="start">
            <p style={{ fontSize: 25, color: labelColor }}>{props.letter}</p>
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            {props.closer === "up" && (
              <ArrowUpwardIcon sx={{ color: props.bw }} />
            )}
            {props.closer === "down" && (
              <ArrowDownwardIcon sx={{ color: props.bw }} />
            )}
            {props.closer === "correct" && (
              <CheckIcon sx={{ color: props.bw }} />
            )}
          </InputAdornment>
        }
        inputProps={{ maxLength: 3, min: 0, max: 255 }}
        variant="standard"
        value={props.val}
        onChange={(e) => props.passVal(e.target.value)}
        disabled={props.disable}
      />
    </div>
  );
}
