const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartBtn = document.getElementById("btn-restart");
const resetBtn = document.getElementById("btn-reset");
const count = document.getElementById("counts");

// Game state variables
let currentTurn = "PLAYER X"; // Tracks whose turn it is
let gameCount = 0; // Total games played
let noughtCount = 0; // PLAYER O wins
let crossCount = 0; // PLAYER X wins
let drawCount = 0; // Total drawn games

// Winning combinations
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Array to store winning combination
let wonArr;

// Display game statistics
count.innerHTML = `
  <p>GAMES PLAYED: ${gameCount}</p>
  <p><span class="playerCol">PLAYER O</span> WON: ${noughtCount}</p>
  <p><span class="playerCol">PLAYER X</span> WON: ${crossCount}</p>
  <p>GAMES DRAWN: ${drawCount}</p>`;

// Add event listeners to each cell
cells.forEach((cell) => {
  cell.addEventListener("mouseenter", hoverIn); // Mouse hover effect
  cell.addEventListener("mouseleave", hoverOut); // Mouse leave effect
  cell.addEventListener("click", action, { once: true }); // Click action
});

// Event listeners for restart and reset buttons
restartBtn.addEventListener("click", restart); // Restart game
resetBtn.addEventListener("click", resetGame); // Reset game

// Function to handle player actions
function action() {
  // Determine current player's class
  let currentClass = currentTurn === "PLAYER X" ? "cross" : "nought"; // Determine current player's classs
  this.classList.remove(`${currentClass}-hover`); // Remove hover effect
  this.classList.add(currentClass); // Add current player's mark

  // Check for a winner
  if (isWinner(currentClass)) {
    message.innerHTML = `<div class="messageColor">GAME OVER</div><div>${currentTurn} WON !!!</div>`; // Display winner message
    wonArr.forEach((i) => cells[i].classList.add("highlight")); // Highlight winning cells
    currentTurn === "PLAYER X" ? crossCount++ : noughtCount++; // Update win counts
    gameCount++; // Increment game count
    reset(); // Reset game state for next game
    return;
  } else {
    // Check for a draw
    const res = Array.from(cells).every((cell) => {
      return cell.classList.length === 2; // Check if all cells are filled
    });
    if (res) {
      message.innerHTML = `<div class="messageColor">GAME OVER</div><div>GAME DRAWN</div>`; // Display draw message
      cells.forEach((cell) => {
        cell.classList.add("highlight2"); // Highlight all cells
      });
      drawCount++; // Increment draw count
      gameCount++; // Increment game count
      reset(); // Reset game state for next game
      return;
    }
  }

  // Switch turns
  currentTurn = currentTurn === "PLAYER X" ? "PLAYER O" : "PLAYER X";
  message.innerHTML = `<div class="spacer">${currentTurn}'s TURN!</div>`; // Update message
}

// Function to check for a winner
function isWinner(curClass) {
  // Check if the current player has won
  return wins.some((win) => {
    const res = win.every((i) => cells[i].classList.contains(curClass));
    if (res) {
      wonArr = win; // Store winning combination
    }
    return res;
  });
}

// Function to handle hover in effect
function hoverIn() {
  // Add hover effect for the current player's turn
  let currentClass = currentTurn === "PLAYER X" ? "cross" : "nought"; // Determine current player's class
  if (this.classList.contains("cross") || this.classList.contains("nought")) {
    this.style.cursor = "not-allowed"; // Change cursor if cell is already occupied
  } else {
    this.classList.add(`${currentClass}-hover`); // Add hover class
  }
}

// Function to handle hover out effect
function hoverOut() {
  // Remove hover effect when mouse leaves the cell
  if (
    this.classList.contains("cross-hover") ||
    this.classList.contains("nought-hover")
  ) {
    this.classList.remove("cross-hover"); // Remove hover effect for PLAYER X
    this.classList.remove("nought-hover"); // Remove hover effect for PLAYER O
  }
}

// Function to restart the game
function restart() {
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", hoverIn); // Re-add hover effects
    cell.addEventListener("mouseleave", hoverOut); // Re-add hover effects
    cell.classList.remove("cross"); // Remove PLAYER X's class
    cell.classList.remove("cross-hover"); // Remove hover effect for PLAYER X
    cell.classList.remove("nought"); // Remove PLAYER O's class
    cell.classList.remove("nought-hover"); // Remove hover effect for PLAYER O
    cell.classList.remove("highlight"); // Remove highlight from winning cells
    cell.classList.remove("highlight2"); // Remove highlight from drawn cells
    cell.removeEventListener("click", action); // Remove click event
    cell.addEventListener("click", action, { once: true }); // Re-add click event
    cell.style.cursor = "pointer"; // Reset cursor
  });

  // Reset the game board for a new round
  currentTurn = currentTurn === "PLAYER X" ? "PLAYER O" : "PLAYER X"; // Alternate starting player
  message.innerHTML = `<div class="messageColor">GAME ON</div><div>${currentTurn}'s TURN</div>`; // Update message
}

// Function to reset the game state
function reset() {
  // Disable all cells after a game ends
  cells.forEach((cell) => {
    cell.removeEventListener("mouseenter", hoverIn); // Remove hover in event
    cell.removeEventListener("mouseleave", hoverOut); // Remove hover out event
    cell.removeEventListener("click", action); // Remove click event
    cell.style.cursor = "not-allowed"; // Change cursor to not-allowed
  });

  // Update game statistics display
  count.innerHTML = `
  <p>GAMES PLAYED: ${gameCount}</p>
  <p><span class="playerCol">PLAYER O</span> WON: ${noughtCount}</p>
  <p><span class="playerCol">PLAYER X</span> WON: ${crossCount}</p>
  <p>GAMES DRAWN: ${drawCount}</p>`;
}

// Function to reset the game completely
function resetGame() {
  location.reload(); // Reload the page to reset the game
}

// Dynamically generate copyright information
let copyright = document.getElementById("copy");
copyright.innerHTML =
  "Copyright &copy; " +
  new Date().getFullYear() +
  ` <a href="https://www.gaz41.com">gaz41.com</a> - <span id="copy2">All Rights Reserved</span>`;
