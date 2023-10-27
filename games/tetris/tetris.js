let pieces = {
  0: {
    type: "I",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],
    color: "#716A5C",
  },
  1: {
    type: "J",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 1],
    ],
    color: "#DCC9A9",
  },
  2: {
    type: "L",
    pieceGrid: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
    ],
    color: "#DCC9A9",
  },
  3: {
    type: "O",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ],
    color: "#A39B8B",
  },
  4: {
    type: "S",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 1],
    ],
    color: "#BAA898",
  },
  5: {
    type: "Z",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 0, 1, 0],
    ],
    color: "#BAA898",
  },
  6: {
    type: "T",
    pieceGrid: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 1],
    ],
    color: "#7D7461",
  },
};

var nextPiece = pieces[Math.floor(Math.random() * 7)];

function generateGame() {
  generateGameGrid(20, 10);
  generateNextPiece();
}

function generateGameGrid(rows, columns) {
  let gameScreen = document.getElementById("gameScreen");
  let table = document.createElement("table");
  table.id = "gameTable";
  gameScreen.appendChild(table);
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      let cell = document.createElement("td");
      cell.id = "cell" + i + j;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

function generateNextPiece() {
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
