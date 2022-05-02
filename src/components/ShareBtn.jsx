import React from "react";
import { Button } from "@mui/material";
import { TheDay } from "./TheColor";
import { Popover, Typography } from "@mui/material";

const url = "https://main.d2qu9x7ue9yf75.amplifyapp.com/";

export default function ShareBtn(props) {
  //popover stuff
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //day number
  const dayNo = TheDay._currentValue;

  //clipboard stuff
  const copyAns = (e) => {
    const finalArr = props.final;
    const stringArr = [];
    stringArr.push(`RGBdle ${dayNo}: ${props.final.length}/6 \n`);
    finalArr.forEach((el) => {
      const string = el.join(" ");
      stringArr.push(string);
    });
    stringArr.push(`\n${url}`);
    const finalStr = stringArr.join("\n");
    copyToClipBoard(finalStr, e);
  };

  //from here: https://www.delftstack.com/howto/javascript/javascript-copy-to-clipboard/
  function copyToClipBoard(content, event) {
    navigator.clipboard
      .writeText(content)
      .then(setAnchorEl(event.currentTarget))
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  }

  if (props.final.length > 0) {
    return (
      <div>
        <Button
          variant="contained"
          color="grey"
          style={{ marginBottom: "1rem" }}
          onClick={(e) => copyAns(e)}
        >
          Share
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>Content copied to clipboard.</Typography>
        </Popover>
      </div>
    );
  } else {
    return (
      <Button disabled style={{ opacity: 0, marginBottom: "1rem" }}>
        Nothing
      </Button>
    );
  }
}
