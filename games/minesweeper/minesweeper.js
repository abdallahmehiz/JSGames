// define global variable grid
var grid;

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
  var cell = event.target;
  var isMine = cell.getAttribute("data-mine") === "true";
  var x = parseInt(cell.getAttribute("data-x"));
  var y = parseInt(cell.getAttribute("data-y"));

  if (isMine) {
    cell.textContent = "X";
  } else {
    var count = countAdjacentMines(x, y);
    cell.textContent = count;
  }

  cell.classList.remove("not-revealed"); // remove the not-revealed class from the cell
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
