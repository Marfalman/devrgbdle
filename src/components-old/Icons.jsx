import React from "react";

import HelpIcon from "@mui/icons-material/Help";
import GitHubIcon from "@mui/icons-material/GitHub";
import { IconButton, Link } from "@mui/material";

export default function Icons(props) {
  return (
    <div style={{ position: "fixed" }}>
      <IconButton onClick={(e) => props.passOpenModal(true)}>
        <HelpIcon />
      </IconButton>
      <IconButton href="https://github.com/lbrowngs/rgbdle" target="_null">
        <GitHubIcon />
      </IconButton>
    </div>
  );
}
