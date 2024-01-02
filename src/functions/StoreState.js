import { getFormattedDate } from "../components/TheColor";
import { Auth, DataStore, Predicates } from "aws-amplify";
import { GameHistory } from "../models";

//Names for cookies holding current game values
const currentState = "gameState";
const pastDays = "pastDays";

const StoredGameState = {
  Red: [],
  Green: [],
  Blue: [],
  GuessNum: [],
  Background: [],
  Close: [],
  Contrast: [],
  Status: "progress",
  expiry: new Date().getDay(),
};

export const StoredPastDays = {
  Win: [],
  Lose: []
};

async function getLoggedIn(){
  try{
    const user = await Auth.currentAuthenticatedUser()
    return user.username;
  } catch(error){
    console.log("no signed in user")
  }
}

export async function updateUserHistory(pastDays){
  try{
    const gameHistory = await getUserData();

    if (gameHistory.length === 0){
      console.log("creating new game history")
      createGameHistory(pastDays);
      return
    }

    const updatedGame = await DataStore.save(
      GameHistory.copyOf(gameHistory[0], updated => {
        const updatedWinDays = [...(gameHistory[0].WinDays) || []]; // Create a new array or use an empty array if undefined
        const updatedLoseDays = [...(gameHistory[0].LoseDays) || []]; // Create a new array or use an empty array if undefined
        //updatedWinDays = pastDays.Win;
        //updatedLoseDays = pastDays.Lose;
        console.log(updatedLoseDays)

        // If any item in pastDays.Win is not in updatedWinDays, add it
        pastDays.Win.forEach((item) => {
          if (!updatedWinDays.includes(item) && !updatedLoseDays.includes(item)) {
            updatedWinDays.push(item);
          }
        });
        // If any item in pastDays.Lose is not in updatedLoseDays, add it
        pastDays.Lose.forEach((item) => {
          if (!updatedWinDays.includes(item) && !updatedLoseDays.includes(item)) {
            updatedLoseDays.push(item);
          }
        });
        updated.WinDays = updatedWinDays;
        updated.LoseDays = updatedLoseDays;
      })
    )
  } catch(error){
    console.log(error)
  }
}

async function getUserData(){
  try {
    const loggedInUser = await getLoggedIn(); // This should return the current logged-in user's details.
    
    if (loggedInUser) {
      // Query the datastore for the game history that has the same owner as the logged-in user.
      const gameHistories = await DataStore.query(GameHistory);
      const userGameHistories = gameHistories.filter(history => history.owner === loggedInUser);
      const activeGameHistories = userGameHistories.filter(history => history._deleted === null);
      return activeGameHistories;
      // Handle the retrieved data
    } else {
      console.log('User not logged in or username not found.');
      return [];
    }

  } catch (error) {
    console.error('Error querying game histories:', error);
    // Handle the error
    return [];
  }
}

async function createGameHistory(pastDays){
  console.log(pastDays)
  try{
    const user = await DataStore.save(
      new GameHistory({
        WinDays: pastDays.Win,
        LoseDays: pastDays.Lose
      })
    );
  } catch (error) {
    console.log("hello yea there's an error writing")
    console.log(error);
  }
}

let currDay;

export function setCurrDay(date){
  currDay = date;
}

export async function getPastDays() {
  const PastDayFrame = {
    Win: [],
    Lose: []
  };

  try {
    const loggedIn = await getLoggedIn();
    if(loggedIn){
      const hasPastDays = await getUserData();
      if(hasPastDays.length > 0){
        const pastDayData = {
          Win: hasPastDays[0].WinDays,
          Lose: hasPastDays[0].LoseDays
        }
        return pastDayData;
      }
    }
  } catch (error) {
    console.log('Error getting past days: ' + error);
    throw new Error(error)
  } 

  const pastDayGames = JSON.parse(localStorage.getItem(pastDays));
  const pastDayGame = pastDayGames ? pastDayGames : PastDayFrame;
  return pastDayGame;
}

export function saveGameState(R, G, B, num, background, close, bwDisplay) {
  if (!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Red.push(R);
  gametoEdit.Green.push(G);
  gametoEdit.Blue.push(B);
  gametoEdit.Background.push(background);
  gametoEdit.GuessNum.push(num + 1);
  gametoEdit.Close[num - 1] = close;
  gametoEdit.Contrast[num - 1] = bwDisplay;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

export async function saveGameProgress(status, date){
  const PastDayFrame = {
    Win: [],
    Lose: []
  };
  if(verifyDate()){
    var currentGame = JSON.parse(localStorage.getItem(currentState));
    var gametoEdit = currentGame ? currentGame : StoredGameState;
    gametoEdit.Status = status;
    localStorage.setItem(currentState, JSON.stringify(gametoEdit));
  }
  if(status === "win" || status === "lose"){
    let loggedIn = await getLoggedIn();
    var pastDayGames = JSON.parse(localStorage.getItem(pastDays));
    const pastDayEdit = pastDayGames ? pastDayGames : PastDayFrame;
    const dayLookup = {
      win: pastDayEdit.Win,
      lose: pastDayEdit.Lose,
    };
    const day = dayLookup[status];
    if (!day.includes(date)){
      day.push(date);
      if (loggedIn){
        //let databaseGameData = await getUserData();
        //If user is logged in and if there is a local storage entry, check if there is a record for them in the database
        //If there is not a record in the database, create one
        //console.log(databaseGameData.length)
        /*
        if(databaseGameData.length === 0){
          console.log("createing new game history")
          await createGameHistory(pastDayEdit);
        }
        else if(databaseGameData.length > 0){
          console.log("updating game history cuz it exists")
          const updatePastDays = {
            Win: [...(databaseGameData[0].WinDays) || []],
            Lose: [...(databaseGameData[0].LoseDays) || []],
          }
          await updateUserHistory(pastDayEdit);
          localStorage.setItem(pastDays, JSON.stringify(updatePastDays));
        }
        */
        
      const databaseGameData = getUserData();
       try{
        console.log(databaseGameData)
        if(databaseGameData.length > 0){
          const updatePastDays = {
            Win: [...(databaseGameData[0].WinDays) || []],
            Lose: [...(databaseGameData[0].LoseDays) || []],
          }
          updateUserHistory(pastDayEdit);
          localStorage.setItem(pastDays, JSON.stringify(updatePastDays));
        }

        updateUserHistory(pastDayEdit);
       } catch (error){
         console.log(error)
       }
        
        
        
      }
      localStorage.setItem(pastDays, JSON.stringify(pastDayEdit));
    }
  }
}

export function alterClose(close, num) {
  if(!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Close[num - 1] = close;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

export function alterContrast(bw, num) {
  if(!verifyDate()){
    return
  }
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Contrast[num - 1] = bw;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

let state = JSON.parse(localStorage.getItem(currentState));

function verifyCookie() {
  state = JSON.parse(localStorage.getItem(currentState));
  const today = new Date().getDay();
  if (!state) {
    return false;
  }
  else if (state.expiry !== today) {
    localStorage.removeItem(currentState);
    return false;
  } else {
    return true;
  }
}

export function verifyDate() {
  const formattedToday = getFormattedDate(new Date());
  return (formattedToday === currDay);
}

export function getSavedGuess() {
  if (!verifyDate() || !verifyCookie()) {
    return 1;
  }

  const guessNum = state.GuessNum.length - 1;
  return state.GuessNum[guessNum];
}

export function getSavedColor(type, num) {
  if (!verifyDate() || !verifyCookie()) {
    if (type === "Background") {
      return null;
    }
    if (type === "Close") {
      return {};
    }
    return "";
  }

  const colorLookup = {
    Red: state.Red,
    Green: state.Green,
    Blue: state.Blue,
    Close: state.Close,
    Background: state.Background,
    Contrast: state.Contrast,
  };

  const colors = colorLookup[type];

  if (colors) {
    const index = num - 1;
    return colors[index] || "";
  }

  return "N/A";
}


export function getTotalGuesses() {
  if (!verifyDate() || !verifyCookie()) {
    return [];
  }

  return state.Close;
}

export function getGameProgress(){
  if (!verifyDate() || !verifyCookie()){
    return "progress";
  }

  return state.Status;
}
