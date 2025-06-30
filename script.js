const board = document.getElementById("board");
const statusText = document.getElementById("status");
let cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let boardState = Array(9).fill("");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleClick(e) {
  const index = e.target.dataset.index;
  if (boardState[index] !== "" || isGameOver()) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
  } else if (boardState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function isGameOver() {
  return checkWinner() || boardState.every(cell => cell !== "");
}

function restartGame() {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  cells.forEach(cell => cell.textContent = "");
  statusText.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
