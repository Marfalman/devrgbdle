import React from "react";
import { Modal, Box, Typography, Container, IconButton } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

export default function FinalModal(props) {
  const handleClose = () => props.passFinalOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 0,
    margin: 0,
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
        <Container>
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
          </div>
        </Container>
      </Box>
    </Modal>
  );
}
