import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggle(props) {
  const [contrast, setContrast] = useState(props.contrast);

  const handleChange = (e) => {
    setContrast(e.target.value);
    props.passContrast(e.target.value);
  };

  const style = {
    height: "100%",
    lineHeight: 0,
    borderRadius: 0,
  };

  const bStyle = {
    ...style,
    backgroundColor: "white",
    color: "black",
  };

  const wStyle = {
    ...style,
    backgroundColor: "black",
    color: "white",
  };

  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={contrast}
      exclusive
      onChange={handleChange}
      size="small"
      style={{ height: "100%", marginRight: "-1px" }}
    >
      <ToggleButton value="black" aria-label="black" style={bStyle}>
        B
      </ToggleButton>
      <ToggleButton value="white" aria-label="white" style={wStyle}>
        W
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
