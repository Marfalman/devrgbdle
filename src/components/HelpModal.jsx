import React from "react";
import {
  Modal,
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
} from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

import StaticGuess from "./StaticGuess";

export default function HelpModal(props) {
  const handleClose = () => props.passModalOpen(false);

  const style = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    bgcolor: "white",
    outline: 0,
    overflow: "scroll",
  };

  const typographyStyle = {
    lineHeight: "1.5rem",
    margin: "1rem 0",
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Container style={{ width: 575 }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            How to play
          </Typography>
          <div id="modal-modal-description">
            <Typography sx={typographyStyle}>
              Like{" "}
              <a href="https://www.nytimes.com/games/wordle/index.html">
                Wordle
              </a>
              , but for colors.
            </Typography>
            <Typography sx={typographyStyle}>
              Guess the RGBdle in six tries.
            </Typography>
            <Typography sx={typographyStyle}>
              Each guess must have a value for R, G, and B values, between 0 and
              255. Hit the enter button to submit.
            </Typography>
            <Typography sx={typographyStyle}>
              After each guess, the background of the guess will change color to
              show the color you submitted.
            </Typography>
            <Typography sx={typographyStyle}>
              If you're close to the value, you'll get a small arrow (up{" "}
              <ArrowDropUpIcon /> or down <ArrowDropDownIcon />) to indicate
              that you just need to increase or decrease the value a{" "}
              <em>tiny</em> bit.
            </Typography>
            <Typography sx={typographyStyle}>
              If you get the value exactly right, you'll see a checkmark{" "}
              <CheckIcon /> next to that value's corresponding letter.
            </Typography>
            <Typography>
              You can also get a hint after each guess by clicking the lightbulb
              icon <TipsAndUpdatesIcon />. These hints <em>will</em> be tracked
              for your final score, and indicate whether you need to increase{" "}
              <ArrowUpwardIcon /> or decrease <ArrowDownwardIcon />
              the value.
            </Typography>
            <Typography sx={typographyStyle}>
              Adjust the values of your next guess to get closer to the true
              color.
            </Typography>
            <Typography sx={typographyStyle}>
              When you guess the true color, the block of your guess will lose
              its grey border.
            </Typography>
            <Typography sx={typographyStyle}>
              Read about{" "}
              <a href="https://en.wikipedia.org/wiki/Color_theory">
                color theory
              </a>{" "}
              to improve your guesses!
            </Typography>
          </div>
          <Divider />
          <Typography sx={typographyStyle}>
            <strong>Symbol Key</strong>
          </Typography>
          <ul style={{ listStyle: "none" }}>
            <li>
              <ArrowDropUpIcon /> Increase the value by a small amount
            </li>
            <li>
              <ArrowDropDownIcon /> Decrease the value by a small amount
            </li>
            <li>
              <CheckIcon /> Correct value!
            </li>
            <li>
              <TipsAndUpdatesIcon /> Get a hint
            </li>
            <li>
              <ArrowUpwardIcon /> Increase the value (available by hint)
            </li>
            <li>
              <ArrowDownwardIcon /> Decrease the value (available by hint)
            </li>
          </ul>
          <Divider />
          <Typography style={{ fontWeight: "bold" }} sx={typographyStyle}>
            Examples
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <StaticGuess colors={[255, 0, 0]} />
            <StaticGuess colors={[0, 255, 0]} />
            <StaticGuess colors={[0, 0, 255]} />
            <StaticGuess colors={[240, 25, 190]} />
            <StaticGuess colors={[65, 135, 130]} />
          </div>
        </Container>
      </Box>
    </Modal>
  );
}
