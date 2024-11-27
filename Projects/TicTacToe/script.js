const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const restartBtn = document.getElementById('restartBtn');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

let scores = {
    X: 0,
    O: 0
};

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `Spieler ${currentPlayer} ist dran`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Spieler ${currentPlayer} ist dran`;
}

function checkWinner() {
    let roundWon = false;
    let winningCombination = [];

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if(cellA === cellB && cellB === cellC) {
            roundWon = true;
            winningCombination = condition;
            break;
        }
    }

    if(roundWon) {
        statusText.textContent = `Spieler ${currentPlayer} gewinnt!`;
        scores[currentPlayer]++;
        updateScores();
        highlightWinningCells(winningCombination);
        running = false;
    }
    else if(!options.includes("")) {
        statusText.textContent = `Unentschieden!`;
        running = false;
    }
    else {
        changePlayer();
    }
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('win');
    });
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Spieler ${currentPlayer} ist dran`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x', 'o', 'win');
    });
    running = true;
}
