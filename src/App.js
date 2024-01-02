import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import Icons from "./components/Icons";
import Logo from "./components/Logo";
import HelpModal from "./components/HelpModal";
import Game from "./components/Game";
import BasicDateCalendar from "./components/PastDays";
import { TheColor, TheDay, pickColor, getFormattedDate } from "./components/TheColor";

import { Amplify, Auth, AuthModeStrategyType, Hub } from "aws-amplify";
import config from "./aws-exports";
import "@aws-amplify/ui-react/styles.css";

import { DataStore, Predicates } from '@aws-amplify/datastore';
import { GameHistory } from './models';
import { SignInOrUp } from "./components/signInOrUp";
import { PlayerLeaderboard } from "./components/PlayerLeaderboard";
import IconsRight from "./components/IconsRight";
import { updateUserHistory, getPastDays } from "./functions/StoreState";
import { refreshStatsCookie, deleteStatsCookie } from "./functions/StoreGetStats";

Amplify.configure({
  ...config,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

async function getLoggedIn(){
  try{
    const user = await Auth.currentAuthenticatedUser()
    return user
  } catch(error){
    console.log("no signed in user")
  }
}

async function getUserData(){
  try {
    const loggedInUser = await getLoggedIn(); // This should return the current logged-in user's details.
    
    if (loggedInUser && loggedInUser.username) {
      // Query the datastore for the game history that has the same owner as the logged-in user.
      const gameHistories = await DataStore.query(GameHistory, Predicates.ALL);
      const userGameHistories = gameHistories.filter(history => history.owner === loggedInUser.username);
      return userGameHistories;
      // Handle the retrieved data
    } else {
      return [];
    }

  } catch (error) {
    console.error('Error querying game histories:', error);
    // Handle the error
    return [];
  }
}


function App() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [user, setUser] = useState('');
  const initialDate = new Date();

  const [answerColor, setAnswerColor] = useState(pickColor(initialDate));
  const [currentDay, setCurrentDay] = useState(getFormattedDate(initialDate));


  Hub.listen('auth', async (data) => {
    if (data.payload.event === 'signIn') {
      setSignedIn(true);
      console.log('User signed in');
    } else if (data.payload.event === 'signOut') {
      setSignedIn(false);
      localStorage.removeItem("pastDays");
      deleteStatsCookie();
      console.log('User signed out');
    } else if (data.payload.event === 'signUp') {
      setSignedIn(true);
      console.log('User signed up');
      await DataStore.start();
    }
  });

  useEffect(() => {
    const PastDayFrame = {
      Win: [],
      Lose: []
    };
    const pastDayGameCookie = JSON.parse(localStorage.getItem("pastDays"));
    const pastDayToSet = pastDayGameCookie ? pastDayGameCookie : PastDayFrame;
    getUserData();
    if(!signedIn){
      setUser('');
    }
    getLoggedIn()
    .then(async (updatedUser) => {
      if(updatedUser && updatedUser.username !== user){
        setUser(updatedUser.username);
        setSignedIn(true);
        const pastDayData = await getPastDays();
        // Merge the past day data from the cookie and the database
        const pastDayDataToSet = {
          Win: [...new Set(pastDayData.Win.concat(pastDayToSet.Win))],
          Lose: [...new Set(pastDayData.Lose.concat(pastDayToSet.Lose))]
        };
        localStorage.setItem("pastDays", JSON.stringify(pastDayDataToSet));
        updateUserHistory(pastDayDataToSet);
        refreshStatsCookie();
        
      }
    })
  }, [signedIn, user]);

  const signOut = async () => {
    console.log("trying to sign out")
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out', error);
    }
  };

  const showSignIn = async () => {
    setSignInOpen(true)
  };

  function newColor(color){
    setAnswerColor(color);
  }

  function newDay(date){
    setCurrentDay(date);
  }

  return (
    <TheColor.Provider value={{ answerColor, newColor }}>
      <TheDay.Provider value={{ currentDay, newDay }}>
      <div className="App">
        <CssBaseline />
        <div>
          <Icons passHelpOpen={setHelpOpen} passPastOpen={setPastOpen} passLeaderboardOpen={setLeaderboardOpen}/>
          <Logo />
          <IconsRight passLeaderboardOpen={setLeaderboardOpen} passShowSignIn={showSignIn} isLoggedIn = {signedIn} signOut={signOut} userName={user}/>
        </div>
        <HelpModal open={helpOpen} passHelpOpen={setHelpOpen} />
        <BasicDateCalendar open = {pastOpen} passPastOpen={setPastOpen} changedUser={signedIn}/>
        <PlayerLeaderboard open = {leaderboardOpen} passLeaderboardOpen={setLeaderboardOpen}/>
        <SignInOrUp open = {signInOpen} passUser={setUser} passShowSignIn={setSignInOpen}/>
        <Game />
      </div>
      </TheDay.Provider>
    </TheColor.Provider>
  );
}

export default App;
