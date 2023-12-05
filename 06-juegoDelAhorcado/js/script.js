const wordContainer = document.getElementById("wordContainer");
const startButton = document.getElementById("startButton");
const usedLettersElement = document.getElementById("usedLetters");

// Inicializamos Canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
  [4, 2, 1, 1],
  [4, 3, 1, 2],
  [3, 5, 1, 1],
  [5, 5, 1, 1],
  [3, 3, 1, 1],
  [5, 3, 1, 1],
];

let selectedWord;
let usedLetters;
let mistakes;
let hits;

startButton.addEventListener("click", startGame);

function startGame() {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = "";
  usedLettersElement.innerHTML = "";
  startButton.style.display = "none";
  drawHangMan();
  selectRandomWord();
  drawWord();
  document.addEventListener("keydown", letterEvent);
}

function drawHangMan() {
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#d95d39";
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);
}

function selectRandomWord() {
  let word = words[Math.floor(Math.random() * words.length)].toUpperCase();
  selectedWord = word.split("");
}

function drawWord() {
  selectedWord.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter.toUpperCase();
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    wordContainer.appendChild(letterElement);
  });
}

function letterEvent(event) {
  let newLetter = event.key.toUpperCase();
  if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) {
    letterInput(newLetter);
  }
}

function letterInput(letter) {
  if (selectedWord.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter();
  }
  addLetter(letter);
  usedLetters.push(letter);
}

function correctLetter(letter) {
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle("hidden");
      hits++;
    }
  }
  if (hits === selectedWord.length) endGame();
}

function endGame() {
  document.removeEventListener("keydown", letterEvent);
  startButton.style.display = "block";
}

function wrongLetter() {
  addBodyPart(bodyParts[mistakes]);
  mistakes++;
  if (mistakes === bodyParts.length) endGame();
}

function addBodyPart(bodyPart) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(...bodyPart);
}

function addLetter(letter) {
  const letterElement = document.createElement("span");
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
}
