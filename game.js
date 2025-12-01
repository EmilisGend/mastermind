// Menu functions
function start1v1(){
	gamemode = "1v1"
	document.getElementById("pattern_area").classList.remove("hidden");
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("pattern_area").classList.remove("hidden");
	initPatternSet();
}

function startvPC() {
  gameMode = "1vPC";
  pattern = Array.from({ length: 6 }, () => colors[Math.floor(Math.random() * 6)]);
    document.getElementById("game_area").classList.remove("hidden");
    document.getElementById("menu").classList.add("hidden");
  prepareGuessing("Guess the PC's pattern!");
}


// Color choices
const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
let gamemode = ""
let pattern = [];
let guesses = [];
let currentGuess = new Array(6).fill(null);
let selectedPegIndex = 0;  // Selected peg index for editing
let turn = 0;

// Pattern making (for P1)
function initPatternSet() {
  document.getElementById("makePattern").classList.remove("hidden");
  makeColorGrid("color-grid", (color) => selectPeg(color));
  pattern = [];
  updatePegsDisplay("pattern", pattern, true);
}
function selectPeg(color) {
  if (pattern.length < 6) pattern.push(color);
  updatePegsDisplay("pattern", pattern, true);
}
function updatePegsDisplay(elem, arr, allowDel, allowSelect = false) {
  let html = "";
  arr.forEach((clr, idx) => {
    const isSelected = allowSelect && idx === selectedPegIndex ? "selected" : "";
    const clrStyle = clr ? `background:${clr}` : "";
    html += `<div class="peg ${isSelected}" style="${clrStyle}" onclick="${allowSelect ? `selectPegIndex(${idx})` : ""}"></div>`;
  });
  for (let i = arr.length; i < 6; i++) html += '<div class="peg"></div>';
  document.getElementById(elem).innerHTML = html;
}
function deletePeg(idx) {
  pattern.splice(idx, 1);
  updatePegsDisplay("pattern", pattern, true);
}
function confirmPattern() {
  if (pattern.length < 6) {
    alert("Choose 6 colors!");
    return;
  }
  document.getElementById("makePattern").classList.add("hidden");
  turn = 1; // Switch to guessing
  prepareGuessing("Player 2: Make your guess!");
}
// Guessing
function prepareGuessing(prompt) {
  guesses = [];
  currentGuess = new Array(6).fill(null);
  selectedPegIndex = 0;
  document.getElementById("guessSection").classList.remove("hidden");
  document.getElementById("oldGuesses").innerHTML = ""; // Clear old guesses list
  document.getElementById("guessPrompt").innerText = prompt;
  updatePegsDisplay("guess", currentGuess, false, true); // enable peg selecting
  makeColorGrid("color-grid-guess", (color) => selectGuessPeg(color));
}
function selectPegIndex(idx) {
  selectedPegIndex = idx;
  updatePegsDisplay("guess", currentGuess, false, true);
}
function selectGuessPeg(color) {
  currentGuess[selectedPegIndex] = color;
  updatePegsDisplay("guess", currentGuess, false, true);
}
function submitGuess() {
  if (currentGuess.includes(null)) {
    alert("Fill all 6 pegs!");
    return;
  }
  guesses.push([...currentGuess]);

  // Show old guesses on screen
  const oldGuessDiv = document.createElement("div");
  oldGuessDiv.style.margin = "5px";
  oldGuessDiv.style.display = "flex";
  currentGuess.forEach(c => {
    const pegDiv = document.createElement("div");
    pegDiv.className = "peg";
    pegDiv.style.backgroundColor = c;
    oldGuessDiv.appendChild(pegDiv);
  });
  document.getElementById("oldGuesses").appendChild(oldGuessDiv);

  if (isCorrectGuess(pattern, currentGuess)) {
    endGame(true);
  } else if (guesses.length >= 12) {
    endGame(false);
  } else {
    currentGuess = new Array(6).fill(null);
    selectedPegIndex = 0;
    updatePegsDisplay("guess", currentGuess, false, true);
    alert("Try again!");
  }
}
function isCorrectGuess(pattern, guess) {
  return JSON.stringify(pattern) === JSON.stringify(guess);
}

// Coloring support
function makeColorGrid(id, cb) {
  document.getElementById(id).innerHTML = colors
    .map((c) => `<div class="color-option" style="background:${c}" onclick="(${cb})('${c}')"></div>`)
    .join("");
}

// End and restart
function endGame(win) {
  document.getElementById("guessSection").classList.add("hidden");
  document.getElementById("endpage").classList.remove("hidden");
  document.getElementById("endmsg").innerText = win ? "You won!" : "You lost!";
}

