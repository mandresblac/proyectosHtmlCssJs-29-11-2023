const board = document.getElementById("board");
const scoreBoard = document.getElementById("scoreBoard");
const startButton = document.getElementById("start");
const gameOverSign = document.getElementById("gameOver");

// Game settings
const boardSize = 10; // Tamaño del tablero
const gameSpeed = 100; // Velocidad
// Objeto con los tipos y valores de los cuadrados
const squareTypes = {
  emptySquare: 0, // Cuadrados vacios
  snakeSquare: 1, // Cuadrados donde esta la serpiente
  foodSquare: 2, // Cuadrados donde esta la comida
};
// Objeto con las direcciones de movimiento
const directions = {
  ArrowUp: -10,
  ArrowDown: 10,
  ArrowRight: 1,
  ArrowLeft: -1,
};

// Variables de juego que se modificaran a medida que avanza el juego
let snake;
let score;
let direction;
let boardSquares;
let emptySquares;
let moveInterval;

startButton.addEventListener("click", startGame);

// Función que da comienzo al juego
function startGame() {
  setGame(); // Para darle valores a todas las variables
  gameOverSign.style.display = "none";
  startButton.disabled = true;
  drawSnake();
  updateScore();
  createRandomFood();
  document.addEventListener("keydown", directionEvent); // Flechas de teclado del usuario
  moveInterval = setInterval(() => moveSnake(), gameSpeed);
}

function setGame() {
  snake = ["00", "01", "02", "03"];
  score = snake.length;
  direction = "ArrowRight";
  boardSquares = Array.from(Array(boardSize), () =>
    new Array(boardSize).fill(squareTypes.emptySquare)
  );
  console.log(boardSquares);
  board.innerHTML = ""; // Borra cualquier contenido del board
  emptySquares = [];
  createBoard();
}

function createBoard() {
  boardSquares.forEach((row, rowIndex) => {
    row.forEach((column, columnndex) => {
      const squareValue = `${rowIndex}${columnndex}`;
      const squareElement = document.createElement("div");
      squareElement.setAttribute("class", "square emptySquare");
      squareElement.setAttribute("id", squareValue);
      board.appendChild(squareElement);
      emptySquares.push(squareValue);
    });
  });
}

/* Funcion para dibujar un solo cuadrado
Rellena cada cuadrado del tablero y sus parametros son:
square: posicion del cuadrado,
type: tipo de cuadrado (emptySquare, snakeSquare, foodSquare) */
function drawSquare(square, type) {
  const [row, column] = square.split("");
  boardSquares[row][column] = squareTypes[type];
  const squareElement = document.getElementById(square);
  squareElement.setAttribute("class", `square ${type}`);

  if (type === "emptySquare") {
    emptySquares.push(square);
  } else {
    if (emptySquares.indexOf(square) !== -1) {
      emptySquares.splice(emptySquares.indexOf(square), 1);
    }
  }
}

function drawSnake() {
  snake.forEach((square) => drawSquare(square, "snakeSquare"));
}

function updateScore() {
  scoreBoard.innerText = score;
}

function createRandomFood() {
  const randomEmptySquare =
    emptySquares[Math.floor(Math.random() * emptySquares.length)];
  drawSquare(randomEmptySquare, "foodSquare");
}

function directionEvent(key) {
  switch (key.code) {
    case "ArrowUp":
      direction != "ArrowDown" && setDirection(key.code);
      break;
    case "ArrowDown":
      direction != "ArrowUp" && setDirection(key.code);
      break;
    case "ArrowLeft":
      direction != "ArrowRight" && setDirection(key.code);
      break;
    case "ArrowRight":
      direction != "ArrowLeft" && setDirection(key.code);
      break;
  }
}

function setDirection(newDirection) {
  direction = newDirection;
}

function moveSnake() {
  const newSquare = String(
    Number(snake[snake.length - 1]) + directions[direction]
  ).padStart(2, "0");
  const [row, column] = newSquare.split("");

  if (
    newSquare < 0 ||
    newSquare > boardSize * boardSize ||
    (direction === "ArrowRight" && column == 0) ||
    (direction === "ArrowLeft" && column == 9) ||
    boardSquares[row][column] === squareTypes.snakeSquare
  ) {
    gameOver();
  } else {
    snake.push(newSquare);
    if (boardSquares[row][column] === squareTypes.foodSquare) {
      addFood();
    } else {
      const emptySquare = snake.shift();
      drawSquare(emptySquare, "emptySquare");
    }
    drawSnake();
  }
}

function gameOver() {
  gameOverSign.style.display = "block";
  clearInterval(moveInterval);
  startButton.disabled = false;
}

function addFood() {
  score++;
  updateScore();
  createRandomFood();
}
