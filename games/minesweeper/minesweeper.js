// define global variable grid
var grid;
let gameOver = false;
function generateGrid(length, width, mines) {
  grid = [];
  // create a grid
  for (var i = 0; i < length; i++) {
    grid.push([]);
    for (var j = 0; j < width; j++) {
      grid[i].push(0);
    }
  }
  // randomly place mines
  for (var i = 0; i < mines; i++) {
    var x = Math.floor(Math.random() * length);
    var y = Math.floor(Math.random() * width);
    grid[x][y] = -1;
  }
}

function createTable(length, width, mines) {
  generateGrid(length, width, mines);
  var table = document.createElement("table");
  for (var i = 0; i < grid.length; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < grid[i].length; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("data-x", i);
      cell.setAttribute("data-y", j);
      // set the data-mine attribute to true if the cell is a mine
      // set the data-value attribute to X if the cell is a mine and O otherwise
      if (grid[i][j] === -1) {
        cell.setAttribute("data-mine", "true");
      } else {
        cell.setAttribute("data-mine", "false");
      }
      cell.classList.add("not-revealed"); // add not-revealed class to the cell
      cell.addEventListener("click", handleClick);
      cell.addEventListener("contextmenu", handleRightClick);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  return table;
}

function renderTable(table) {
  var game = document.getElementById("game");
  game.innerHTML = "";
  game.appendChild(table);
}

function handleClick(event) {
  // Prevent click if the game is over
  if (gameOver) return;
  if (
    event.target.classList.contains("icon-flag") ||
    event.target.classList.contains("icon-question") ||
    event.target.classList.contains("revealed") // this one is for optimization
  )
    return;
  var cell = event.target;
  var isMine = cell.getAttribute("data-mine") === "true";
  var x = parseInt(cell.getAttribute("data-x"));
  var y = parseInt(cell.getAttribute("data-y"));

  if (event.button === 0) {
    // left click
    if (isMine) {
      cell.classList.remove("not-revealed");
      cell.classList.add("revealed", "mine", "icon-bomb");
      gameOver = true;
      disableCells();
      revealMines();
      alert("You lose!");
    } else {
      var count = countAdjacentMines(x, y);
      cell.textContent = count;
      cell.classList.remove("not-revealed");
      cell.classList.add("revealed");
      if (count === 0) {
        clearAdjacentZeros(x, y);
      }
      // Check for win
      checkForWin();
    }
  } else if (event.button === 2) {
    // right click
    event.preventDefault();
    cell.classList.toggle("icon-flag");
  }
}

function handleRightClick(event) {
  event.preventDefault();
  if (gameOver) return;
  if (event.target.classList.contains("revealed")) return;

  var cell = event.target;
  if (
    !cell.classList.contains("icon-flag") &&
    !cell.classList.contains("icon-question")
  ) {
    cell.classList.add("icon-flag");
    mineCount--;
    if (mineCount < 0) mineCount = 0;
    document.querySelector("#mine-count").textContent =
      mineCount + ` mines left`;
  } // add flagged class to the cell
  else if (cell.classList.contains("icon-flag")) {
    cell.classList.add("icon-question");
    cell.classList.remove("icon-flag");
    mineCount++;
    document.querySelector("#mine-count").textContent =
      mineCount + ` mines left`;
  } else if (cell.classList.contains("icon-question")) {
    cell.classList.remove("icon-question");
  }
}

function countAdjacentMines(x, y) {
  var count = 0;
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (
        i >= 0 &&
        i < grid.length &&
        j >= 0 &&
        j < grid[0].length &&
        grid[i][j] === -1
      ) {
        count++;
      }
    }
  }
  return count;
}

function clearAdjacentZeros(x, y) {
  for (var i = x - 1; i <= x + 1; i++) {
    for (var j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length) {
        var cell = document.querySelector(`[data-x="${i}"][data-y="${j}"]`);
        if (cell.classList.contains("not-revealed")) {
          var count = countAdjacentMines(i, j);
          cell.textContent = count;
          cell.classList.remove("not-revealed");
          if (count === 0) {
            clearAdjacentZeros(i, j);
          }
        }
      }
    }
  }
}

function disableCells() {
  var cells = document.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", handleClick);
  }
}

function revealMines() {
  var cells = document.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
    var cell = cells[i];
    if (cell.getAttribute("data-mine") === "true") {
      cell.classList.remove("not-revealed");
      cell.classList.add("revealed", "mine", "icon-bomb");
    }
  }
}

function checkForWin() {
  var cells = document.getElementsByTagName("td");
  var count = 0;
  for (var i = 0; i < cells.length; i++) {
    if (
      cells[i].getAttribute("data-mine") === "false" &&
      cells[i].classList.contains("not-revealed")
    ) {
      count++;
    }
  }
  if (count === 0) {
    alert("You win!");
    disableCells();
    revealMines();
  }
}
