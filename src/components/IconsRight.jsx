import { IconButton } from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { Auth } from "aws-amplify";
import React, { useState, useEffect } from "react";

function getFirstLetter(user) {
    return user.charAt(0).toUpperCase();
}

async function getLoggedIn(){
  try{
    const user = await Auth.currentAuthenticatedUser()
    return user.username;
  } catch(error){
    console.log("no signed in user")
  }
}

export default function IconRight(props) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(props.userName)
  }, [props.userName]);

  return (
    <div style={{position: 'fixed', top: '18px', right: '5px'}}>
      <IconButton onClick={() => props.passLeaderboardOpen(true)}>
        <LeaderboardIcon />
      </IconButton>
      {props.isLoggedIn ? (
            <IconButton>
                <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }} onClick={() => props.signOut()}>
                  {getFirstLetter(props.userName)}
                </Avatar>
            </IconButton>
        ) : (
            <IconButton>
                <AccountCircleIcon onClick={() => props.passShowSignIn(true)} />
            </IconButton>
        )}
    </div>
  );
}