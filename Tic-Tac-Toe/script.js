const board = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const playWithAiCheckbox = document.getElementById('play-with-ai');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["","","","","","","","",""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

board.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkWinner();

    if (gameActive && playWithAiCheckbox.checked && currentPlayer === 'O') {
        aiMove();
    }
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.pointerEvents = 'none';
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `It's ${currentPlayer}'s turn`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `It's ${currentPlayer}'s turn`;

    board.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = 'auto';
    });
}

function aiMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const aiCellIndex = availableCells[randomIndex];
    const aiCell = document.querySelector(`.cell[data-index="${aiCellIndex}"]`);

    updateCell(aiCell, aiCellIndex);
    checkWinner();
}
