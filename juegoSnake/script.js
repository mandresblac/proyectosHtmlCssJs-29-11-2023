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
