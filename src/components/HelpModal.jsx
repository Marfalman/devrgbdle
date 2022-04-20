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
  };

  const typographyStyle = {
    lineHeight: "2rem",
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
          <Typography id="modal-modal-description" sx={typographyStyle}>
            Like{" "}
            <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>
            , but for colors. <br /> Guess the RGBdle in six tries. <br />
            Each guess must have a value for R, G, and B values, between 0 and
            255. Hit the enter button to submit.
            <br />
            After each guess, the background of the guess will change color to
            show the color you submitted. Adjust the values of your next guess
            to get closer to the true color.
            <br />
            When you guess the true color, the block of your guess will lose its
            grey border.
            <br />
            Read about{" "}
            <a href="https://en.wikipedia.org/wiki/Color_theory">
              color theory
            </a>{" "}
            to improve your guesses!
          </Typography>
          <Divider />
          <Typography style={{ fontWeight: "bold" }} sx={typographyStyle}>
            Examples
          </Typography>
          PUT THE STATIC GUESSES HERE
        </Container>
      </Box>
    </Modal>
  );
}
