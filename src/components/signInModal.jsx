import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from "@mui/material/Alert";
import Typography from '@mui/material/Typography';
import { Auth } from "aws-amplify";

export async function signIn(username, password){
    try {
      const user = await Auth.signIn(username, password);

    } catch (error) {
      throw new Error(error)
    }
}

async function forgotPassword(username) {
  try {
    const data = await Auth.forgotPassword(username);
  } catch(error) {
    throw new Error(error)
  }
}

// Collect confirmation code and new password
async function forgotPasswordSubmit(username, code, newPassword) {
  try {
    const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
  } catch(error) {
    throw new Error(error)
  }
}

export function SignInModal(props){
    const [signInFail, setSignInFail] = useState(false);
    const [passwordForget, setPasswordForget] = useState(false);
    const [submitNewPassword, setSubmitNewPassword] = useState(false);

    const handleForgotPassword = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      forgotPassword(data.get('username'))
      .then(user => {
        setSignInFail(false)
        setSubmitNewPassword(true)
      })
      .catch(error => {
        setSignInFail(true)
      })
    };

    const handleNewPassword = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      forgotPasswordSubmit(data.get('username'), data.get('code'), data.get('newPassword'))
      .then(user => {
        setSignInFail(false)
        props.close(true)
      })
      .then(user => signIn(data.get('username'), data.get('newPassword')))
      .catch(error => {
        setSignInFail(true)
      })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signIn(data.get('username'), data.get('password'))
        .then(user => {
          setSignInFail(false)
          props.close(true)
        })
        .catch(error => {
          setSignInFail(true)
        })
      };

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2
      };
    return (
      <div>
        {!passwordForget ? <div>
          {signInFail && <Alert severity="error">Incorrect username/password. Please try again</Alert>}
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button onClick={() => setPasswordForget(true)} variant="body2">
                  Forgot password?
                </Button>
              </Grid>
            </Grid>
          </Box>
          </div>
          : !submitNewPassword ?
          <div>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {signInFail && <Alert severity="error">Username does not exist</Alert>}
          <Box component="form" onSubmit={handleForgotPassword} noValidate sx={{ mt: 1 }}>
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
          </div>
          :
          <div>
            <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Alert severity="info">Check your email for the confirmation code</Alert>
          <Box component="form" onSubmit={handleNewPassword} noValidate sx={{ mt: 1 }}>
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              id="code"
              label="Confirmation Code"
              name="code"
            />
            <TextField
              error={signInFail}
              margin="normal"
              required
              fullWidth
              type="password"
              id="newPassword"
              label="New Password"
              name="newPassword"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit New Password
            </Button>
          </Box>
          </div>
        }
      </div>
    )
}