import { Cookies } from "react-cookie";

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
    "win": 0
  };

const cookies = new Cookies();

export function savePlayerStats(guesses, win) {
    var today = new Date();
    var tomorrow = ((23-today.getHours())*(60*60)) + ((59-today.getMinutes())*60) + (59-today.getSeconds()); //get time in seconds until next day local time

    let lastGuess = guesses[guesses.length - 1];
    if (
        lastGuess.R === "correct" &&
        lastGuess.G === "correct" &&
        lastGuess.B === "correct"
    ) {
        if(!cookies.get(TODAY_COOKIE)){ //Only set new stats cookie if user hasn't visited site yet today
            cookies.set(TODAY_COOKIE, "played", { path: '/', maxAge:tomorrow });
            updateStats(lastGuess.num, win);
        }
    }
}

function updateStats(winGuess, status){
    let winToUpdate
    if(cookies.get(STATS_COOKIE)){
        let currentStats = JSON.stringify(cookies.get(STATS_COOKIE));
        winToUpdate = JSON.parse(currentStats);
        winToUpdate[winGuess]++;
    }
    else{
        winToUpdate = InitialGameState;
        winToUpdate[winGuess]++;
    }
    if(status === "win"){
        winToUpdate["win"]++;
    }
    winToUpdate["total"]++;

    var futureDate = new Date();
    futureDate.setFullYear(2050);
    cookies.set(STATS_COOKIE, winToUpdate, { path: '/', expires: futureDate}); //StackOverflow said this was the way to keep cookie past session
}