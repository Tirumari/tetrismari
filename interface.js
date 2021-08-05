import { startGame } from "./tetris.js";

// add event listener to button
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", startGame);