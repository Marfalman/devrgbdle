const currentState = "gameState";

const StoredGameState = {
  Red: [],
  Green: [],
  Blue: [],
  GuessNum: [],
  Background: [],
  Close: [],
  Contrast: [],
  expiry: new Date().getDay(),
};

export function saveGameState(R, G, B, num, background, close, bwDisplay) {
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

export function alterClose(close, num) {
  var currentGame = JSON.parse(localStorage.getItem(currentState));
  var gametoEdit = currentGame ? currentGame : StoredGameState;
  gametoEdit.Close[num - 1] = close;
  localStorage.setItem(currentState, JSON.stringify(gametoEdit));
}

const state = JSON.parse(localStorage.getItem(currentState));

function verifyDate() {
  const today = new Date().getDay();
  if (!state) {
    return false;
  } else if (state.expiry !== today) {
    localStorage.removeItem(currentState);
    return false;
  } else {
    return true;
  }
}

export function getSavedGuess() {
  if (!verifyDate()) {
    return null;
  }

  const guessNum = state.GuessNum.length - 1;
  return state.GuessNum[guessNum];
}

export function getSavedColor(type, num) {
  if (!verifyDate()) {
    return null;
  } else if (
    type === "Red" ||
    type === "Green" ||
    type === "Blue" ||
    type === "Background" ||
    type === "Close" ||
    type === "Contrast"
  ) {
    const index = num - 1;
    switch (type) {
      case "Red":
        return state.Red[index];

      case "Green":
        return state.Green[index];

      case "Blue":
        return state.Blue[index];

      case "Close":
        return state.Close[index];

      case "Background":
        return state.Background[index];

      case "Contrast":
        return state.Contrast[index];

      default:
        return "N/A";
    }
  }
}

export function getTotalGuesses() {
  if (!verifyDate()) {
    return null;
  }

  return state.Close;
}
