const board = document.getElementById("board");
const slots = [...board.querySelectorAll("div.slot")];
const finishScreen = document.getElementById("finish-screen");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");
const playerDisplay = document.getElementById("player");
let player = 0;
let gameState = {current: ["0","0","0","0","0","0","0","0","0"]};

// makes the game run
for (let i = 0; i < slots.length; i++){
    const slot = slots[i];
    slot.addEventListener("mousedown", () => {
        const slotId = slot.id;
        if (player == 0){
            if (isEmpty(slot.textContent)) {
                slot.style.color = "#146eff";
                slot.style.textShadow = '#003c9c 0px 0px 2px';
                slot.innerHTML = `<span>X</span>`;
                gameState.current[slotId] = slot.textContent;
                player++;
                playerDisplay.style.color = "#f72525";       
                playerDisplay.textContent = "Player 2";
            } else {
                return;
            }
        } else {
            if (isEmpty(slot.textContent)) {
                slot.style.color = "#f72525";
                slot.style.textShadow = '#940404 0px 0px 2px';
                slot.innerHTML = `<span>O</span>`;
                gameState.current[slotId] = slot.textContent;
                player--;
                playerDisplay.style.color = "#146eff";
                playerDisplay.textContent = "Player 1";
            } else {
                return;
            }
        }
        hasWon(gameState.current);
    });
}
restartBtn.addEventListener("click", restartGame)
// checks if someone had won
function hasWon(board) {
    let win = new Array([0, 1, 2], // Check first row.
               [3, 4, 5], // Check second Row
               [6, 7, 8], // Check third Row
               [0, 3, 6], // Check first column
               [1, 4, 7], // Check second Column
               [2, 5, 8], // Check third Column
               [0, 4, 8], // Check first Diagonal
               [2, 4, 6]); // Check second Diagonal
    
    // Check all possible winning combinations
    for (let i = 0; i < 8; i++) {
        if (board[win[i][0]] == "X" && board[win[i][1]] == "X" && board[win[i][2]] == "X") {
            isOver("Player 1");
        } else if (board[win[i][0]] == "O" && board[win[i][1]] == "O" && board[win[i][2]] == "O") {
            isOver("Player 2");
        } else if (!(gameState.current.includes("0")) && !(board[win[i][0]] == "X" && board[win[i][1]] == "X" && board[win[i][2]] == "X" || board[win[i][0]] == "O" && board[win[i][1]] == "O" && board[win[i][2]] == "O")) {
            isOver("Noone");            
        }
    }
}
// displays end screen and winner
function isOver(winner) {
    finishScreen.style.visibility = "visible";
    finishScreen.style.opacity = "1";
    result.textContent = `${winner} has won!`;
    playerDisplay.textContent = "Game Over";
    playerDisplay.style.color = "white"
}
// checks if string is empty
function isEmpty(str) {
    if (str === "") {
        return true;
    } else {
        return false;
    }
}
// restarts the game
function restartGame() {
    gameState.current = ["0","0","0","0","0","0","0","0","0"];
    for (let i = 0; i < slots.length; i++) {
        slots[i].textContent = '';
        finishScreen.style.opacity = "0";
        finishScreen.style.visibility = "hidden";
        if(player === 0) {
            playerDisplay.textContent = "Player 1";
            playerDisplay.style.color = "#146eff";
        } else {
            playerDisplay.textContent = "Player 2";
            playerDisplay.style.color = "#f72525";
        }
    }
}