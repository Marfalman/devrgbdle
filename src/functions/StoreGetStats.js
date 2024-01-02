import { Cookies } from "react-cookie";
import { verifyDate, getSavedGuess, getGameProgress } from "./StoreState";
import { Auth, DataStore, Predicates } from "aws-amplify";
import { PlayerStats, LeaderBoard } from "../models";

async function getLoggedIn(){
    try{
      const user = await Auth.currentAuthenticatedUser()
      return user.username;
    } catch(error){
      console.log("no signed in user")
    }
  }

export const STATS_COOKIE = "Statistics"
export const TODAY_COOKIE = "Today"
export const InitialGameState = { //key/value framework for stats cookie
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    "total": 0,
    "win": 0,
    "streak": 0,
    "max_streak": 0
  };

function guessHistory(gameState) {
    // return JSON object of just the guess history of InitialGameState

    return {
        1: gameState[1],
        2: gameState[2],
        3: gameState[3],
        4: gameState[4],
        5: gameState[5],
        6: gameState[6]
    }
}

async function updateLeaderboardRecord(user, gameStats){
    // Update the leaderboard record for the user with the current player's stats
    try{
        const leaderboards = await DataStore.query(LeaderBoard);
        const leaderboardRecord = leaderboards.filter(record => record.preferred_username === user);
        if (leaderboardRecord.length === 0){
            const newLeaderboardRecord = await DataStore.save(
                new LeaderBoard({
                    preferred_username: user,
                    winStreak: gameStats["streak"],
                    winPercent: Math.round((gameStats["win"]/gameStats["total"])*100),
                    totalWins: gameStats["win"],
                    gamesPlayed: gameStats["total"]
                })
            );
        }
        else {
            const updatedLeaderboardRecord = await DataStore.save(
                LeaderBoard.copyOf(leaderboardRecord[0], updated => {
                    updated.winStreak = gameStats["streak"];
                    updated.winPercent = Math.round((gameStats["win"]/gameStats["total"])*100);
                    updated.totalWins = gameStats["win"];
                    updated.gamesPlayed = gameStats["total"];
                })
            );
        }
    } catch(error){
        console.log(error)
    }

}

async function getPlayerStats(){
    try {
        const loggedInUser = await getLoggedIn(); // This should return the current logged-in user's details.
        
        if (loggedInUser) {
          // Query the datastore for the game history that has the same owner as the logged-in user.
          const playerStats = await DataStore.query(PlayerStats, Predicates.ALL);
          const userPlayerStats = playerStats.filter(history => history.owner === loggedInUser);
          return userPlayerStats;
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

async function createPlayerStats(stats){
    console.log(stats)
    try{
      const user = await DataStore.save(
        new PlayerStats({
            guessData: guessHistory(stats),
            total: stats["total"],
            win: stats["win"],
            streak: stats["streak"],
            maxStreak: stats["max_streak"]
        })
      );
    } catch (error) {
      console.log("hello yea there's an error writing")
      console.log(error);
    }
}

async function updatePlayerStats(stats){
    try{
      const playerStats = await getPlayerStats();
      console.log(playerStats)
  
      const updatedGame = await DataStore.save(
        PlayerStats.copyOf(playerStats[0], updated => {
            console.log(updated)
            updated.guessData = guessHistory(stats);
            updated.total = stats["total"];
            updated.win = stats["win"];
            updated.streak = stats["streak"];
            updated.maxStreak = stats["max_streak"];
        })
      )
    } catch(error){
      console.log(error)
    }
}

export async function getStatistics() {
    try {
      const loggedIn = await getLoggedIn();
      if(loggedIn){
        const pastStatistics = await getPlayerStats();
        if (pastStatistics.length > 0) {
          const pastStatsData = {
            1: pastStatistics[0].guessData[1],
            2: pastStatistics[0].guessData[2],
            3: pastStatistics[0].guessData[3],
            4: pastStatistics[0].guessData[4],
            5: pastStatistics[0].guessData[5],
            6: pastStatistics[0].guessData[6],
            "total": pastStatistics[0].total,
            "win": pastStatistics[0].win,
            "streak": pastStatistics[0].streak,
            "max_streak": pastStatistics[0].maxStreak
          }
          console.log(pastStatsData)
          return pastStatsData;
        } 
        else{
            return {};
        }
      }
    } catch (error) {
      console.log('Error getting past stats: ' + error);
      throw new Error(error)
    } 

    return {};
}

const cookies = new Cookies();

export function savePlayerStats(lastGuess, win) {
    var today = new Date();
    var tomorrow = ((23-today.getHours())*(60*60)) + ((59-today.getMinutes())*60) + (59-today.getSeconds()); //get time in seconds until next day local time
    if(!cookies.get(TODAY_COOKIE)){ //Only set new stats cookie if user hasn't visited site yet today
        cookies.set(TODAY_COOKIE, "played", { path: '/', maxAge:tomorrow });
        if(verifyDate()){
            updateStats(lastGuess, win);
        }
    }
}

export function getTodayCookie(){
    return cookies.get(TODAY_COOKIE);
}

export function deleteStatsCookie(){
    cookies.remove(STATS_COOKIE, { path: '/' });
}

export async function refreshStatsCookie(){
    let loggedIn = await getLoggedIn();
    let winToUpdate = cookies.get(STATS_COOKIE) ? JSON.parse(JSON.stringify(cookies.get(STATS_COOKIE))) : InitialGameState;
    if(loggedIn){
        const dbStats = await getStatistics();
        let pastStats = Object.keys(dbStats).length ? dbStats : InitialGameState;
        var futureDate = new Date();
        futureDate.setFullYear(2050);
        if(getTodayCookie() === "played"){
            if(Object.keys(dbStats).length === 0){
                createPlayerStats(winToUpdate);
            }
            else{
                cookies.set(STATS_COOKIE, pastStats, { path: '/', expires: futureDate});
            }
        }
        else{
            if(Object.keys(dbStats).length > 0){
                cookies.set(STATS_COOKIE, pastStats, { path: '/', expires: futureDate});
            }
        }
    }
}

async function updateStats(winGuess){
    let loggedIn = await getLoggedIn();
    let winToUpdate = cookies.get(STATS_COOKIE) ? JSON.parse(JSON.stringify(cookies.get(STATS_COOKIE))) : InitialGameState;
    if(loggedIn){
        const pastStats = await getStatistics();
        if(Object.keys(pastStats).length > 0){
            console.log(pastStats)
            winToUpdate = pastStats;
        }

    }
    winToUpdate["total"]++;
    if(winGuess < 7){ //win case
        winToUpdate[winGuess]++;
        winToUpdate["win"]++;
        winToUpdate["streak"]++;
        if(winToUpdate["streak"] > winToUpdate["max_streak"]){
            winToUpdate["max_streak"] = winToUpdate["streak"];
        }
    }
    else{ //lose case
        winToUpdate["streak"] = 0;
    }

    var futureDate = new Date();
    futureDate.setFullYear(2050);

    cookies.set(STATS_COOKIE, winToUpdate, { path: '/', expires: futureDate}); //StackOverflow said this was the way to keep cookie past session
    

    if (loggedIn){
        let playerStatData = await getPlayerStats();
        //If user is logged in and if there is a local storage entry, check if there is a record for them in the database
        //If there is not a record in the database, create one
        if(playerStatData.length === 0){
          createPlayerStats(winToUpdate);
        }
        else if(playerStatData.length > 0){
          updatePlayerStats(winToUpdate);
        }
        updateLeaderboardRecord(loggedIn, winToUpdate);
    }
}
