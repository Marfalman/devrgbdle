import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import Icons from "./components/Icons";
import Logo from "./components/Logo";
import HelpModal from "./components/HelpModal";
import Game from "./components/Game";

function App() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="App">
      <CssBaseline />
      <div>
        <Icons passHelpOpen={setHelpOpen} />
        <Logo />
      </div>
      <HelpModal open={helpOpen} passHelpOpen={setHelpOpen} />
      <Game />
    </div>
  );
}

export default App;
