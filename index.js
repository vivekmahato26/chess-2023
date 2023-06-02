const root = document.getElementById("root");
(() => {
  for (let i = 1; i < 9; i++) {
    for (let j = 1; j < 9; j++) {
      const div = document.createElement("div");
      // div.innerText = i + "," + j;
      div.style.width = "80px";
      div.style.height = "80px";
      div.style.display = "flex";
      div.style.justifyContent = "center";
      div.style.alignItems = "center";
      div.setAttribute("data-cords", i + "," + j);
      root.appendChild(div);
      if ((i + j) % 2) {
        div.style.backgroundColor = "#8bc34ac7";
      } else {
        div.style.backgroundColor = "#ffff004d";
      }
    }
  }
})();

class Piece {
  constructor(color, initialPos, currentPos, moves, img, name, code) {
    this.color = color;
    this.initialPos = initialPos;
    this.currentPos = currentPos;
    this.moves = moves;
    this.img = img;
    this.name = name;
    this.code = code;
    this.validMoves = [];
  }

  displayPiece = () => {
    const box = document.querySelector(
      `[data-cords="${this.currentPos.x},${this.currentPos.y}"]`
    );
    const img = document.createElement("img");
    img.setAttribute("src", this.img);
    img.style.maxWidth = "50px";
    box.setAttribute("data-color", this.color);
    box.setAttribute("data-code", this.code);
    box.appendChild(img);
    box.addEventListener("mouseenter", (event) => showMoves(event, this));
    box.addEventListener("mouseleave", (event) => hideMoves(event, this));
  };

  calculateMoves = () => {
    let turn = "white";
    let king;
    if (turn === "black") king = kb;
    if (turn === "white") king = kw;
    const checkingPieces = isCheck(king);
    console.log(checkingPieces);
    if (checkingPieces.length > 1)
      return calculateKingMoves(king, checkingPieces);
    let pieceName = this.name.split(" ")[0];
    switch (pieceName) {
      case "Pawn":
        calculatePawnMoves(this);
        break;
      case "Rook":
        calculateRookMoves(this);
        break;
      case "Knight":
        calculateKnightMoves(this);
        break;
      case "Bishop":
        calculateBishopMoves(this);
        break;
      case "King":
        calculateKingMoves(this);
        break;
      case "Queen":
        calculateQueenMoves(this);
        break;
    }
  };
}

const rx1 = new Piece(
  "black",
  { x: 1, y: 1 },
  { x: 1, y: 1 },
  [],
  "./media/b_rook.svg",
  "Rook Black 1",
  "rx1"
);
const rx2 = new Piece(
  "black",
  { x: 5, y: 8 },
  { x: 5, y: 8 },
  [],
  "./media/b_rook.svg",
  "Rook Black 2",
  "rx2"
);
const kx1 = new Piece(
  "black",
  { x: 1, y: 2 },
  { x: 1, y: 2 },
  [],
  "./media/b_knight.svg",
  "Knight Black 1",
  "kx1"
);
const kx2 = new Piece(
  "black",
  { x: 3, y: 6 },
  { x: 3, y: 6 },
  [],
  "./media/b_knight.svg",
  "Knight Black 2",
  "kx2"
);
const bx1 = new Piece(
  "black",
  { x: 1, y: 3 },
  { x: 1, y: 3 },
  [],
  "./media/b_bishop.svg",
  "Bishop Black 1",
  "bx1"
);
const bx2 = new Piece(
  "black",
  { x: 1, y: 6 },
  { x: 1, y: 6 },
  [],
  "./media/b_bishop.svg",
  "Bishop Black 2",
  "bx2"
);
const kb = new Piece(
  "black",
  { x: 1, y: 5 },
  { x: 1, y: 5 },
  [],
  "./media/b_king.svg",
  "King Black",
  "kb"
);
const qb = new Piece(
  "black",
  { x: 1, y: 4 },
  { x: 1, y: 4 },
  [],
  "./media/b_queen.svg",
  "Queen Black",
  "qb"
);

const px1 = new Piece(
  "black",
  { x: 2, y: 1 },
  { x: 2, y: 1 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 1",
  "px1"
);
const px2 = new Piece(
  "black",
  { x: 2, y: 2 },
  { x: 2, y: 2 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 2",
  "px2"
);
const px3 = new Piece(
  "black",
  { x: 2, y: 3 },
  { x: 2, y: 3 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 3",
  "px3"
);
const px4 = new Piece(
  "black",
  { x: 2, y: 4 },
  { x: 2, y: 4 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 4",
  "px4"
);
const px5 = new Piece(
  "black",
  { x:3, y: 5 },
  { x:3, y: 5 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 5",
  "px5"
);
const px6 = new Piece(
  "black",
  { x: 2, y: 6 },
  { x: 2, y: 6 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 6",
  "px6"
);
const px7 = new Piece(
  "black",
  { x: 2, y: 7 },
  { x: 2, y: 7 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 7",
  "px7"
);
const px8 = new Piece(
  "black",
  { x: 2, y: 8 },
  { x: 2, y: 8 },
  [],
  "./media/b_pawn.svg",
  "Pawn Black 8",
  "px8"
);

const p1 = new Piece(
  "white",
  { x: 7, y: 1 },
  { x: 7, y: 1 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 1",
  "p1"
);
const p2 = new Piece(
  "white",
  { x: 7, y: 2 },
  { x: 7, y: 2 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 2",
  "p2"
);
const p3 = new Piece(
  "white",
  { x: 7, y: 3 },
  { x: 7, y: 3 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 3",
  "p3"
);
const p4 = new Piece(
  "white",
  { x: 7, y: 4 },
  { x: 7, y: 4 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 4",
  "p4"
);
const p5 = new Piece(
  "white",
  { x: 7, y: 5 },
  { x: 7, y: 5 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 5",
  "p5"
);
const p6 = new Piece(
  "white",
  { x: 7, y: 6 },
  { x: 7, y: 6 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 6",
  "p6"
);
const p7 = new Piece(
  "white",
  { x: 7, y: 7 },
  { x: 7, y: 7 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 7",
  "p7"
);
const p8 = new Piece(
  "white",
  { x: 7, y: 8 },
  { x: 7, y: 8 },
  [],
  "./media/w_pawn.svg",
  "Pawn White 8",
  "p8"
);
const r1 = new Piece(
  "white",
  { x: 8, y: 1 },
  { x: 8, y: 1 },
  [],
  "./media/w_rook.svg",
  "Rook White 1",
  "r1"
);
const r2 = new Piece(
  "white",
  { x: 8, y: 8 },
  { x: 8, y: 8 },
  [],
  "./media/w_rook.svg",
  "Rook White 2",
  "r2"
);
const k1 = new Piece(
  "white",
  { x: 8, y: 2 },
  { x: 8, y: 2 },
  [],
  "./media/w_knight.svg",
  "Knight White 1",
  "k1"
);
const k2 = new Piece(
  "white",
  { x: 8, y: 7 },
  { x: 8, y: 7 },
  [],
  "./media/w_knight.svg",
  "Knight White 2",
  "k2"
);
const b1 = new Piece(
  "white",
  { x: 8, y: 3 },
  { x: 8, y: 3 },
  [],
  "./media/w_bishop.svg",
  "Bishop White 1",
  "b1"
);
const b2 = new Piece(
  "white",
  { x: 8, y: 6 },
  { x: 8, y: 6 },
  [],
  "./media/w_bishop.svg",
  "Bishop White 2",
  "b2"
);
const kw = new Piece(
  "white",
  { x: 5, y: 5 },
  { x: 5, y: 5 },
  [],
  "./media/w_king.svg",
  "King White",
  "kw"
);
const qw = new Piece(
  "white",
  { x: 8, y: 4 },
  { x: 8, y: 4 },
  [],
  "./media/w_queen.svg",
  "Queen White",
  "qw"
);

const piecesArr = [
  rx1,
  rx2,
  bx1,
  bx2,
  kx1,
  kx2,
  qb,
  kb,
  px1,
  px2,
  px3,
  px4,
  px5,
  px6,
  px7,
  px8,
  r1,
  r2,
  b1,
  b2,
  k1,
  k2,
  qw,
  kw,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
];

piecesArr.forEach((e) => e.displayPiece());

const calculatePawnMoves = (obj) => {
  obj.moves = [];
  if (obj.color === "black") {
    if (
      obj.initialPos.x === obj.currentPos.x &&
      obj.initialPos.y === obj.currentPos.y
    ) {
      obj.moves.push({
        x: obj.currentPos.x + 2,
        y: obj.currentPos.y,
      });
    }
    obj.moves.push({
      x: obj.currentPos.x + 1,
      y: obj.currentPos.y,
    });
    const { capture1, capture2 } = pawnCaptureMoves(obj, -1);
    if (capture1.capturable) obj.moves.push(capture1);
    if (capture2.capturable) obj.moves.push(capture2);
  }
  if (obj.color === "white") {
    if (
      obj.initialPos.x === obj.currentPos.x &&
      obj.initialPos.y === obj.currentPos.y
    ) {
      obj.moves.push({
        x: obj.currentPos.x - 2,
        y: obj.currentPos.y,
      });
    }
    obj.moves.push({
      x: obj.currentPos.x - 1,
      y: obj.currentPos.y,
    });
    const { capture1, capture2 } = pawnCaptureMoves(obj, 1);
    if (capture1.capturable) obj.moves.push(capture1);
    if (capture2.capturable) obj.moves.push(capture2);
  }
  const directions = { moves: obj.moves };
  const newDirections = sortDirections(directions, obj);
  const filteredMoves = filterMoves(newDirections, obj);
  obj.validMoves = filteredMoves;
};

const showMoves = (event, obj) => {
  obj.calculateMoves();
  const { validMoves } = obj;

  validMoves.forEach((e) => {
    const box = document.querySelector(`[data-cords="${e.x},${e.y}"]`);
    box.style.backgroundColor = "rgba(27, 156, 252,0.2)";
    if (e.capturable) {
      box.style.backgroundColor = "rgba(231, 76, 60,0.7)";
    }
    if (e.check) {
      box.style.backgroundColor = "rgba(231, 76, 60,1)";
    }
  });
};

const hideMoves = (event, obj) => {
  const { validMoves } = obj;
  validMoves.forEach((e) => {
    const box = document.querySelector(`[data-cords="${e.x},${e.y}"]`);
    if ((e.x + e.y) % 2) {
      box.style.backgroundColor = "#8bc34ac7";
    } else {
      box.style.backgroundColor = "#ffff004d";
    }
  });
};

const calculateKingMoves = (obj) => {
  obj.moves = [];
  let moves = [];
  let newMoves = [];
  const { currentPos } = obj;
  moves.push({ x: currentPos.x + 1, y: currentPos.y + 1 });
  moves.push({ x: currentPos.x - 1, y: currentPos.y - 1 });
  moves.push({ x: currentPos.x + 1, y: currentPos.y });
  moves.push({ x: currentPos.x, y: currentPos.y + 1 });
  moves.push({ x: currentPos.x - 1, y: currentPos.y });
  moves.push({ x: currentPos.x, y: currentPos.y - 1 });
  moves.push({ x: currentPos.x + 1, y: currentPos.y - 1 });
  moves.push({ x: currentPos.x - 1, y: currentPos.y + 1 });
  moves = moves.filter((e) => e.x > 0 && e.x < 9 && e.y > 0 && e.y < 9);
  const oppPieceArr = piecesArr.filter((e) => e.color !== obj.color);
  moves.forEach((e) => {
    for (const piece of oppPieceArr) {
      const possibleCheck = piece.moves.filter(m => m.x == e.x && m.y == e.y );
      if(!possibleCheck.length) {
        if(!newMoves.filter(nm => nm.x == e.x && nm.y == e.y).length) {
          console.log(newMoves);
          console.log(e);
          newMoves.push(e);
        }
      }
    }
   obj.moves = newMoves;
  });
  obj.validMoves = kFilterMoves(obj);
};

const calculateKnightMoves = (obj) => {
  obj.moves = [];
  const { currentPos } = obj;
  obj.moves.push({ x: currentPos.x + 2, y: currentPos.y + 1 });
  obj.moves.push({ x: currentPos.x + 2, y: currentPos.y - 1 });
  obj.moves.push({ x: currentPos.x + 1, y: currentPos.y + 2 });
  obj.moves.push({ x: currentPos.x - 1, y: currentPos.y + 2 });
  obj.moves.push({ x: currentPos.x - 2, y: currentPos.y + 1 });
  obj.moves.push({ x: currentPos.x - 2, y: currentPos.y - 1 });
  obj.moves.push({ x: currentPos.x + 1, y: currentPos.y - 2 });
  obj.moves.push({ x: currentPos.x - 1, y: currentPos.y - 2 });
  obj.moves = obj.moves.filter((e) => e.x > 0 && e.x < 9 && e.y > 0 && e.y < 9);
  obj.validMoves = kFilterMoves(obj);
};

const calculateRookMoves = (obj) => {
  obj.moves = [];
  const { currentPos } = obj;
  for (let i = 1; i < 8; i++) {
    let newX = currentPos.x + i;
    if (newX > 8) {
      newX = newX - 8;
    }
    obj.moves.push({ x: newX, y: currentPos.y });
  }
  for (let i = 1; i < 8; i++) {
    let newY = currentPos.y + i;
    if (newY > 8) {
      newY = newY - 8;
    }
    obj.moves.push({ y: newY, x: currentPos.x });
  }
  const directions = splitRookDirections(obj);
  const newDir = sortDirections(directions, obj);
  const filteredMoves = filterMoves(newDir, obj);
  obj.validMoves = filteredMoves;
};

const calculateBishopMoves = (obj) => {
  obj.moves = [];
  const { currentPos } = obj;
  let move = 1;
  while (move < 8) {
    obj.moves.push({
      x: currentPos.x + move,
      y: currentPos.y + move,
    });
    move++;
  }
  move = 1;
  while (move < 8) {
    obj.moves.push({
      x: currentPos.x - move,
      y: currentPos.y - move,
    });
    move++;
  }
  move = 1;
  while (move < 8) {
    obj.moves.push({
      x: currentPos.x + move,
      y: currentPos.y - move,
    });
    move++;
  }
  move = 1;
  while (move < 8) {
    obj.moves.push({
      x: currentPos.x - move,
      y: currentPos.y + move,
    });
    move++;
  }
  obj.moves = obj.moves.filter((e) => e.x > 0 && e.x < 9 && e.y > 0 && e.y < 9);
  const directions = splitBishopDirection(obj);
  const newDir = sortDirections(directions, obj);
  const filteredMoves = filterMoves(newDir, obj);
  obj.validMoves = filteredMoves;
};

const calculateQueenMoves = (obj) => {
  calculateBishopMoves(obj);
  const { currentPos } = obj;
  for (let i = 1; i < 8; i++) {
    let newX = currentPos.x + i;
    if (newX > 8) {
      newX = newX - 8;
    }
    obj.moves.push({ x: newX, y: currentPos.y });
  }
  for (let i = 1; i < 8; i++) {
    let newY = currentPos.y + i;
    if (newY > 8) {
      newY = newY - 8;
    }
    obj.moves.push({ y: newY, x: currentPos.x });
  }
  const directions = splitQueenDirection(obj);
  const newDir = sortDirections(directions, obj);
  const filteredMoves = filterMoves(newDir, obj);
  obj.validMoves = filteredMoves;
};

const splitRookDirections = (obj) => {
  const { moves } = obj;
  const up = [],
    down = [],
    right = [],
    left = [];
  for (const m of moves) {
    if (m.x < obj.currentPos.x && m.y === obj.currentPos.y) up.push(m);
    if (m.x > obj.currentPos.x && m.y === obj.currentPos.y) down.push(m);
    if (m.x === obj.currentPos.x && m.y < obj.currentPos.y) left.push(m);
    if (m.x === obj.currentPos.x && m.y > obj.currentPos.y) right.push(m);
  }
  return { up, down, left, right };
};

const sortDirections = (directions, obj) => {
  // sortFunction({x:1,y:1},{x:3,y:4},{currentPos:{x:2,y:2}})
  const newDir = {};
  for (const key in directions) {
    newDir[key] = directions[key].sort((a, b) => sortFunction(b, a, obj));
  }
  return newDir;
};

const sortFunction = (p1, p2, obj) => {
  return distacne(p2, obj.currentPos) - distacne(p1, obj.currentPos);
};

const distacne = (a, b) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const filterMoves = (directions, obj) => {
  let filteredMoves = [];
  for (const key in directions) {
    for (const move of directions[key]) {
      const box = document.querySelector(`[data-cords="${move.x},${move.y}"]`);
      const boxPieceColor = box.dataset.color; // box.getAttribute("data-color");
      if (boxPieceColor) {
        if (obj.name.includes("Pawn")) break;
        const { color } = obj;
        if (color !== boxPieceColor) {
          filteredMoves.push({
            ...move,
            capturable: true,
          });
        }
        break;
      }
      filteredMoves.push(move);
    }
  }
  return filteredMoves;
};

const splitBishopDirection = ({ moves, currentPos }) => {
  const ur = [],
    ul = [],
    dr = [],
    dl = [];
  moves.forEach((e) => {
    if (currentPos.x < e.x && currentPos.y > e.y) ur.push(e);
    if (currentPos.x < e.x && currentPos.y < e.y) ul.push(e);
    if (currentPos.x > e.x && currentPos.y > e.y) dr.push(e);
    if (currentPos.x > e.x && currentPos.y < e.y) dl.push(e);
  });
  return { ur, ul, dr, dl };
};

const splitQueenDirection = ({ moves, currentPos }) => {
  const obj = { moves, currentPos };
  const vhDir = splitRookDirections({ moves, currentPos }); // { up, down, left, right }
  const diagDir = splitBishopDirection(obj); // {ur,ul,dr,dl}
  return { ...vhDir, ...diagDir };
};

const kFilterMoves = (obj) => {
  let filteredMoves = [];
  for (const move of obj.moves) {
    const box = document.querySelector(`[data-cords="${move.x},${move.y}"]`);
    const boxPieceColor = box.dataset.color; // box.getAttribute("data-color");
    if (boxPieceColor) {
      const { color } = obj;
      if (color !== boxPieceColor) {
        filteredMoves.push({
          ...move,
          capturable: true,
        });
      }
    } else {
      filteredMoves.push(move);
    }
  }
  return filteredMoves;
};

const pawnCaptureMoves = (obj, mul) => {
  const capture1 = { x: obj.currentPos.x - 1 * mul, y: obj.currentPos.y + 1 };
  const capture2 = { x: obj.currentPos.x - 1 * mul, y: obj.currentPos.y - 1 };
  if (capture1.x > 0 && capture1.x < 9 && capture1.y > 0 && capture1.y < 9) {
    const box1 = document.querySelector(
      `[data-cords="${capture1.x},${capture1.y}"]`
    );
    const boxPieceColor1 = box1.dataset.color;
    if (boxPieceColor1 !== obj.color && boxPieceColor1 !== undefined)
      capture1.capturable = true;
  } else {
    capture1.capturable = false;
  }
  if (capture2.x > 0 && capture2.x < 9 && capture2.y > 0 && capture2.y < 9) {
    const box2 = document.querySelector(
      `[data-cords="${capture2.x},${capture2.y}"]`
    );
    const boxPieceColor2 = box2.dataset.color;
    if (boxPieceColor2 !== obj.color && boxPieceColor2 !== undefined)
      capture2.capturable = true;
  } else {
    capture2.capturable = false;
  }
  return { capture1, capture2 };
};

const isCheck = (obj) => {
  const oppPieceArr = piecesArr.filter(
    (e) => e.color !== obj.color && !e.name.includes("King")
  );

  const checkingPieces = [];
  for (const p of oppPieceArr) {
    const captureMoves = p.validMoves.filter((e) => e.capturable);
    for (const move of captureMoves) {
      if (move.x == obj.currentPos.x && move.y == obj.currentPos.y) {
        checkingPieces.push(p);
        break;
      }
    }
  }
  return checkingPieces;
};

class Player {
  constructor(name, time, color, turn) {
    this.name = name;
    this.time = time;
    this.color = color;
    this.turn = turn;
    this.check = false;
    this.mate = false;
  }

  static changeTurn(player1, player2) {
    if (player1.turn) {
      player1.turn = false;
      player2.turn = true;
    } else {
      player1.turn = true;
      player2.turn = false;
    }
  }
}
