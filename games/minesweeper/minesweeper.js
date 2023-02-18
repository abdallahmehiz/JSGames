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
        cell.setAttribute("data-value", "X");
      } else {
        cell.setAttribute("data-mine", "false");
        cell.setAttribute("data-value", "O");
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
  if (gameOver) {
    return;
  }

  var cell = event.target;
  var isMine = cell.getAttribute("data-mine") === "true";
  var x = parseInt(cell.getAttribute("data-x"));
  var y = parseInt(cell.getAttribute("data-y"));

  if (isMine) {
    gameOver = true;
    revealMines();
    disableCells();
  } else {
    var count = countAdjacentMines(x, y);
    cell.textContent = count;
    cell.classList.remove("not-revealed");
    if (count === 0) {
      clearAdjacentZeros(x, y);
    }
  }
}

function handleRightClick(event) {
  event.preventDefault();
  var cell = event.target;
  if (
    !cell.classList.contains("flagged") &&
    !cell.classList.contains("question-marked")
  )
    cell.classList.add("flagged"); // add flagged class to the cell
  else if (cell.classList.contains("flagged")) {
    cell.classList.add("question-marked");
    cell.classList.remove("flagged");
  } else if (cell.classList.contains("question-marked")) {
    cell.classList.remove("question-marked");
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
    if (cells[i].getAttribute("data-mine") === "true") {
      cells[i].textContent = "X";
      cells[i].classList.remove("not-revealed");
    }
  }
}
