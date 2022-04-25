import React from "react";
import { Button, Grid } from "@mui/material";

export default function Keypad() {
  return (
    <div style={{ maxWidth: "384px", width: "100%", marginTop: "4rem" }}>
      <Grid container>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              1
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              2
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              3
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              4
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              5
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="grey" fullWidth={true}>
              6
            </Button>
          </Grid>
          <Grid container item xs={12} spacing={1}>
            <Grid item xs={4}>
              <Button variant="contained" color="grey" fullWidth={true}>
                7
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="grey" fullWidth={true}>
                8
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="grey" fullWidth={true}>
                9
              </Button>
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={1} justifyContent="flex-end">
            <Grid item xs={4}>
              <Button variant="contained" color="grey" fullWidth={true}>
                0
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="outlined"
                fullWidth={true}
                style={{ color: "grey", borderColor: "grey" }}
              >
                enter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
