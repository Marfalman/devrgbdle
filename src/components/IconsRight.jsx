import { IconButton } from "@mui/material";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

function getFirstLetter(user) {
    return user.charAt(0).toUpperCase();
}

export default function IconRight(props) {
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