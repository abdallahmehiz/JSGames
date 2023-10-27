let pieces = {
  0: {
    type: "I",
    pieceGrid: [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#716A5C",
  },
  1: {
    type: "J",
    pieceGrid: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#DCC9A9",
  },
  2: {
    type: "L",
    pieceGrid: [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#DCC9A9",
  },
  3: {
    type: "O",
    pieceGrid: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#A39B8B",
  },
  4: {
    type: "S",
    pieceGrid: [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#BAA898",
  },
  5: {
    type: "Z",
    pieceGrid: [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#BAA898",
  },
  6: {
    type: "T",
    pieceGrid: [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#7D7461",
  },
};

var nextPiece = pieces[Math.floor(Math.random() * 7)];
var currentPiece = {
  piece: nextPiece,
  position: [0, 5],
};
var gameGrid = () => {
  let grid = [];
  for (let i = 0; i < 14; i++) {
    grid.push([]);
    for (let j = 0; j < 10; j++) {
      grid[i].push(0);
    }
  }
};

function renderGame() {
  renderGameGrid(20, 10);
  renderNextPiece();
}

async function startGame() {
  let gameOver = false;
  renderGame();
  let gameTable = document.getElementById("gameTable");
  while (!gameOver) {
    {
      movePieceDown(false);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

function renderCurrentPiece() {
  let piece = currentPiece.piece;
  let position = currentPiece.position;
  for (let i = 0; i < piece["pieceGrid"].length; i++) {
    for (let j = 0; j < piece["pieceGrid"][i].length; j++) {
      let cell = document.getElementById(
        "cell" + (i + position[0]) + (j + position[1])
      );
      if (piece["pieceGrid"][i][j] == 1) {
        cell.classList.add(currentPiece.piece["type"]);
        cell.classList.remove("not-filled");
        cell.classList.add("filled");
      }
    }
  }
}

function movePieceDown() {
  let piece = currentPiece.piece;
  let position = currentPiece.position;
  for (let i = 0; i < piece["pieceGrid"].length; i++) {
    for (let j = 0; j < piece["pieceGrid"][i].length; j++) {
      let cell = document.getElementById(
        "cell" + (i + position[0]) + (j + position[1])
      );
      if (piece["pieceGrid"][i][j] == 1) {
        cell.classList.remove(currentPiece.piece["type"]);
        cell.classList.remove("filled");
        cell.classList.add("not-filled");
      }
    }
  }
  currentPiece.position[0]++;
  renderCurrentPiece();
}

function renderGameGrid(rows, columns) {
  let gameScreen = document.getElementById("gameScreen");
  let table = document.createElement("table");
  table.id = "gameTable";
  gameScreen.appendChild(table);
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("td");
      cell.id = "cell" + i + j;
      cell.classList.add("not-filled");
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function renderNextPiece() {
  nextPiece = pieces[Math.floor(Math.random() * 7)];
  let nextPieceDisplay = document.getElementById("nextPiece");
  nextPieceDisplay.innerHTML = "";
  let table = document.createElement("table");
  table.id = "nextPieceTable";
  console.log(nextPiece);
  nextPieceDisplay.appendChild(table);
  for (let i = 0; i < 4; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      let cell = document.createElement("td");
      cell.id = "nextPieceCell" + i + j;
      if (nextPiece["pieceGrid"][i][j] == 1)
        cell.style.backgroundColor = nextPiece["color"];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}
