import CssBaseline from "@mui/material/CssBaseline";

import Logo from "./components/Logo";
import TrueColor from "./components/TrueColor";
import Guesses from "./components/Guesses";
import HelpModal from "./components/HelpModal";

import HelpIcon from "@mui/icons-material/Help";
import { IconButton } from "@mui/material";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <IconButton style={{ position: "fixed" }}>
        <HelpIcon />
      </IconButton>
      <HelpModal />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Logo />
        <TrueColor />
        <Guesses />
      </div>
    </div>
  );
}

export default App;
