import React, { useState, useEffect } from "react";
import { useDataStoreBinding } from "@aws-amplify/ui-react/internal";
import { LeaderBoard } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { grey } from "@mui/material/colors";
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import { ListItemIcon } from "@mui/material";
import { Auth } from "aws-amplify";


async function getLoggedIn(){
    try{
      const user = await Auth.currentAuthenticatedUser()
      return user
    } catch(error){
      console.log("no signed in user from leaderboard")
    }
  }

function capFirstLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);

}

export function PlayerLeaderboard(props){
    const [user, setUser] = useState("");
    const handleClose = () => props.passLeaderboardOpen(false);

    useEffect(() => {
        // Check if the user is already signed in
        getLoggedIn()
        .then(user => {
          if (user){
            setUser(user.username)
          }
          else{
            setUser("")
          }
        })
    }, [user, props.open]);

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid darkgrey',
        borderRadius: 8,
        boxShadow: 24,
        p: 2,
        overflowY: 'hidden',
        maxHeight: 400,
        '&::-webkit-scrollbar': {
            width: '0.5em',
        },
        '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: 8,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: 8,
            height: 99
        },
      };

    const itemsPagination = { sort: (s) => s.totalWins(SortDirection.DESCENDING) };

    const itemsDataStore = useDataStoreBinding({
        type: "collection",
        model: LeaderBoard,
        pagination: itemsPagination,
    }).items;

    function PlayerInfo(props){
        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'left',
            fontWeight: 'semi-bold',
            width: '100%',
            color: theme.palette.text.secondary,
          }));

          return (
            <Stack direction="row" spacing={0} justifyContent="center">
                <Item elevation={0}>
                    <Typography variant="subtitle1" sx={{marginLeft: .5, color: grey[900]}}>{props.row.totalWins}</Typography>
                    <Typography variant="caption">Wins</Typography> 
                </Item>
                <Item elevation={0}>
                    <Typography variant="subtitle1" sx={{marginLeft: .5, color: grey[900]}}>{props.row.winPercent}</Typography>
                    <Typography variant="caption">Win %</Typography> 
                </Item>
                <Item elevation={0}>
                    <Typography variant="subtitle1" sx={{marginLeft: .5, color: grey[900]}}>{props.row.winStreak}</Typography>
                    <Typography variant="caption">Streak</Typography> 
                </Item>
                <Item elevation={0}>
                    <Typography variant="subtitle1" sx={{marginLeft: .5, color: grey[900]}}>{props.row.gamesPlayed}</Typography>
                    <Typography variant="caption">Streak</Typography> 
                </Item>
            </Stack>

          )
    }

      return (
        <div>
          <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
            <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Leaderboard
          </Typography>
          <Divider />
            <div style={{ overflow: 'auto', borderRadius: 8, maxHeight: 400 }}>
              <List sx={{ width: '100%', height: '100%', maxWidth: 360, bgcolor: 'background.paper', paddingBottom: '50px' }}>
                {itemsDataStore.map((row, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" >
                    <ListItemIcon sx={{ minWidth: 30}}>
                        <Badge badgeContent={index+1} color={row.preferred_username === user ? "warning" : "primary"} anchorOrigin={{ vertical: 'center', horizontal: 'center'}} />
                    </ListItemIcon>
                      <ListItemText
                        secondaryTypographyProps={{ component: 'span' }}
                        primary={capFirstLetter(row.preferred_username)}
                        secondary={
                          <React.Fragment>
                              <PlayerInfo row={row} />
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              </div>
            </Box>
          </Modal>
        </div>
      );
}