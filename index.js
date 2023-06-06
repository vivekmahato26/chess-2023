let allMoves = [];
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
      div.addEventListener("click", (e) => handleMove(e));
      root.appendChild(div);
      if ((i + j) % 2) {
        div.style.backgroundColor = "#8bc34ac7";
      } else {
        div.style.backgroundColor = "#ffff004d";
      }
    }
  }
})();

const checkCastle = (obj) => {
  const { color, initialmove, currentPos } = obj; // King's
  const check = isCheck(obj);
  if (check.length) return null;
  if (initialmove !== null) return null;
  const rooks = piecesArr.filter(
    (e) => e.name.includes("Rook") && e.color == color
  );
  const oppPieceArr = piecesArr.filter((e) => e.color !== color);
  const validCastleMoves = rooks.map((e) => {
    if (e.initialmove !== null) return null;
    let init, maxi;
    if (e.currentPos.y < currentPos.y) {
      init = e.currentPos.y + 1;
      maxi = currentPos.y;
    } else {
      maxi = e.currentPos.y;
      init = currentPos.y + 1;
    }
    for (let i = init; i < maxi; i++) {
      const box = document.querySelector(`[data-cords="${currentPos.x},${i}"]`);
      const boxColor = box.getAttribute("data-color");
      if (boxColor) return null;
      const blockedBox = oppPieceArr.filter((opp) => {
        const checkMove = opp.validMoves.filter(
          (m) => m.x == currentPos.x && m.y == i
        );
        return checkMove.length;
      });
      if (blockedBox.length) return null;
    }
    if (e.currentPos.y < currentPos.y) {
      return {
        rookObj: e,
        rook: {
          x: currentPos.x,
          y: maxi - 1,
        },
        king: {
          x: currentPos.x,
          y: maxi - 2,
        },
      };
    } else {
      return {
        rookObj: e,
        rook: {
          x: currentPos.x,
          y: maxi - 2,
        },
        king: {
          x: currentPos.x,
          y: maxi - 1,
        },
      };
    }
  });
  return validCastleMoves;
};

const calculatePawnMoves = (obj) => {
  obj.moves = [];
  if (obj.color === "black") {
    pawnMoves(obj, -1);
  }
  if (obj.color === "white") {
    pawnMoves(obj, 1);
  }
};

const showMoves = () => {
  const code = event.target.parentElement.dataset.code;
  const obj = piecesArr.find((e) => e.code == code);
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
    if (e.enpassant) {
      box.style.backgroundColor = "rgba(231, 200, 60,1)";
    }
  });
  if (obj.name.includes("King")) {
    const { castleMoves } = obj;
    if (!castleMoves) return;
    castleMoves.forEach((e) => {
      if (!e) return;
      const { king } = e;
      const box = document.querySelector(`[data-cords="${king.x},${king.y}"]`);
      box.style.backgroundColor = "#70a1ff";
    });
    // for (const cm of castleMoves) {
    //   if(!cm) continue;
    // }
  }
};

const hideMoves = () => {
  // const code = event.target.parentElement.dataset.code;
  // const obj = piecesArr.find((e) => e.code == code);
  // const { validMoves } = obj;
  // validMoves.forEach((e) => {
  //   const box = document.querySelector(`[data-cords="${e.x},${e.y}"]`);
  //   if ((e.x + e.y) % 2) {
  //     box.style.backgroundColor = "#8bc34ac7";
  //   } else {
  //     box.style.backgroundColor = "#ffff004d";
  //   }
  // });
  root.childNodes.forEach((e) => {
    const i = e.dataset.cords.split(",")[0];
    const j = e.dataset.cords.split(",")[1];
    if ((parseInt(i) + parseInt(j)) % 2) {
      e.style.backgroundColor = "#8bc34ac7";
    } else {
      e.style.backgroundColor = "#ffff004d";
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
  obj.moves = findKingMoves({ moves: moves, color: obj.color });
  obj.validMoves = kFilterMoves(obj);
  const castleMoves = checkCastle(obj);
  obj.castleMoves = castleMoves;
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
  obj.moves = obj.moves.filter((e) => e.x > 0 && e.x < 9 && e.y > 0 && e.y < 9);
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
        const { color } = obj;
        if (color !== boxPieceColor) {
          filteredMoves.push({
            ...move,
            capturable: true,
          });
        }
        if (box.dataset.code == "kw" || box.dataset.code == "kb") continue;
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

const pawnMoves = (obj, mul) => {
  if (obj.currentPos.x == obj.initialPos.x) {
    obj.moves.push({
      x: obj.currentPos.x - 1 * mul,
      y: obj.currentPos.y,
    });
    obj.moves.push({
      x: obj.currentPos.x - 2 * mul,
      y: obj.currentPos.y,
    });
  } else {
    obj.moves.push({
      x: obj.currentPos.x - 1 * mul,
      y: obj.currentPos.y,
    });
  }
  const capture1 = { x: obj.currentPos.x - 1 * mul, y: obj.currentPos.y + 1 };
  const capture2 = { x: obj.currentPos.x - 1 * mul, y: obj.currentPos.y - 1 };
  capture1.capturable = true;
  capture2.capturable = true;
  obj.moves.push(capture1);
  obj.moves.push(capture2);
  obj.moves = obj.moves.filter((e) => e.x > 0 && e.x < 9 && e.y > 0 && e.y < 9);
  obj.validMoves = [];
  for (const e of obj.moves) {
    const box = document.querySelector(`[data-cords="${e.x},${e.y}"]`);
    const color = box.dataset.color;
    if (obj.currentPos.x == obj.initialPos.x) {
      if (!color && e.x == obj.currentPos.x - 1 * mul) {
        obj.validMoves.push(e);
      }
      if (!color && e.x == obj.currentPos.x - 2 * mul) {
        const prevBox = document.querySelector(
          `[data-cords="${e.x + 1 * mul},${e.y}"]`
        );
        const prevColor = prevBox.dataset.color;
        if (!prevColor) obj.validMoves.push(e);
      }
      if (color && color !== obj.color && e.capturable) {
        obj.validMoves.push(e);
      }
    } else {
      if (color && color !== obj.color && e.capturable) {
        obj.validMoves.push(e);
      }
      if (!color) {
        obj.validMoves.push(e);
      }
    }
  }
  if (obj.initialPos.x - 3 * mul == obj.currentPos.x) {
    const newCords = [
      { x: obj.currentPos.x, y: obj.currentPos.y + 1 },
      { x: obj.currentPos.x, y: obj.currentPos.y - 1 },
    ];
    const boxes = newCords.map((e) =>
      document.querySelector(`[data-cords="${e.x},${e.y}"]`)
    );
    boxes.forEach((bx) => {
      if (!bx) return;
      const color = bx.dataset.color;
      const code = bx.dataset.code;
      const cords = bx.dataset.cords;
      if (!bx.dataset.code) return;
      if (!code.includes("p")) return;
      if (color == obj.color) return;
      const piece = piecesArr.find((e) => e.code == code);
      if (!piece.initialmove) return;
      if (allMoves[allMoves.length - 1].code !== code) return;
      obj.validMoves.push({
        x: obj.currentPos.x - 1 * mul,
        y: parseInt(cords.split(",")[1]),
        capturable: true,
        enpassant: true,
      });
    });
  }
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

const findKingMoves = (obj) => {
  const { moves, color } = obj;
  let oppPieceArr = piecesArr.filter((e) => e.color !== color);
  moves.forEach((e) => {
    for (const piece of oppPieceArr) {
      let possibleCheck = [];
      if (piece.name.includes("Pawn")) {
        possibleCheck = piece.validMoves.filter(
          (m) => m.x == e.x && m.y == e.y && m.capturable
        );
      } else {
        possibleCheck = piece.validMoves.filter(
          (m) => m.x == e.x && m.y == e.y
        );
      }
      if (possibleCheck.length) {
        e.check = true;
      }
    }
  });
  return moves;
};
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
    this.initialmove = null;
    this.numMoves = 0;
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
    img.addEventListener("mouseenter", showMoves);
    img.addEventListener("mouseleave", hideMoves);
  };

  calculateMoves = () => {
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
  { x: 1, y: 8 },
  { x: 1, y: 8 },
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
  { x: 1, y: 7 },
  { x: 1, y: 7 },
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
  { x: 2, y: 5 },
  { x: 2, y: 5 },
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
  { x: 8, y: 8 },
  { x: 8, y: 5 },
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
piecesArr.forEach((e) => e.calculateMoves());

const timerInput = document.getElementsByClassName("timerInput");
let timer;

for (const ti of timerInput) {
  ti.addEventListener("change", (e) => {
    if (e.target.checked) timer = e.target.value;
  });
}

let player1Inp, player2Inp;

document
  .getElementById("playerName1")
  .addEventListener("change", (e) => (player1Inp = e.target.value));
document
  .getElementById("playerName2")
  .addEventListener("change", (e) => (player2Inp = e.target.value));

class Player {
  constructor(name, time, color, turn) {
    this.name = name;
    this.time = time;
    this.color = color;
    this.turn = turn;
    this.check = false;
    this.mate = false;
    this.capturedPieces = [];
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
  set capturedPiece(piece) {
    this.capturedPieces.push(piece);
  }
}

const player1 = new Player(player1Inp, timer, "white", true);
const player2 = new Player(player2Inp, timer, "black", false);
const player1Cap = document.getElementById("capturedPieces1");
const player2Cap = document.getElementById("capturedPieces2");

const moveObj = {
  selectedPiece: {},
  to: "",
};

const handleMove = (event) => {
  let targetBox;
  if (event.target.dataset.cords) targetBox = event.target;
  if (!event.target.dataset.cords) targetBox = event.target.parentElement;
  let currentColor = "white";
  if (player1.turn) currentColor = player1.color;
  if (player2.turn) currentColor = player2.color;
  const selectedColor = targetBox.dataset.color;
  if (!moveObj.selectedPiece.cords) {
    if (selectedColor !== currentColor) return alert("Select a valid piece");
    moveObj.selectedPiece.cords = targetBox.dataset.cords;
    moveObj.selectedPiece.code = targetBox.dataset.code;
    moveObj.selectedPiece.color = targetBox.dataset.color;
  } else {
    moveObj.to = targetBox.dataset.cords;
    movePiece();
  }
};

// const castleKing = (obj) => {

// }

const movePiece = () => {
  const piece = piecesArr.filter(
    (e) => e.code == moveObj.selectedPiece.code
  )[0];
  // const piece = piecesArr.find(e => e.code == moveObj.selectedPiece.code);
  const dest = {
    x: parseInt(moveObj.to.split(",")[0]),
    y: parseInt(moveObj.to.split(",")[1]),
  };
  if (piece.name.includes("King")) {
    if (dest.y == piece.currentPos.y + 2 || dest.y == piece.currentPos.y - 2) {
      if (piece.castleMoves == null) return alert("Castle not possible");
      if (piece.castleMoves.filter((e) => !e).length == 2)
        return alert("Castle not possible");
      const castleMove = piece.castleMoves.filter((e) => {
        if (!e) return false;
        if (e.king.x == dest.x && e.king.y == dest.y) return true;
        return false;
      });
      if (!castleMove.length) return alert("Castle not possible");
      piece.currentPos = dest;
      makeMove(piece, true);
      moveObj.selectedPiece.cords =
        castleMove[0].rookObj.currentPos.x +
        "," +
        castleMove[0].rookObj.currentPos.y;
      castleMove[0].rookObj.currentPos = castleMove[0].rook;
      return makeMove(castleMove[0].rookObj, true);
    }
  }
  const checkMove = piece.validMoves.filter(
    (e) => e.x == dest.x && e.y == dest.y
  );
  if (!checkMove.length) {
    moveObj.selectedPiece = {};
    moveObj.to = "";
    return alert("Select valid move");
  }
  if (checkMove[0].capturable) {
    const nextBox = document.querySelector(`[data-cords="${moveObj.to}"]`);
    const capturedP = piecesArr.find(
      (e) => e.currentPos.x == dest.x && e.currentPos.y == dest.y
    );
    const img = document.createElement("img");
    img.style.width = "20px";
    img.style.height = "20px";
    img.setAttribute("src", capturedP.img);
    player1Cap.style.display = "flex";
    player2Cap.style.display = "flex";
    if (player1.turn) {
      player1.capturedPiece = capturedP;
      player1Cap.appendChild(img);
    }
    if (player2.turn) {
      player2.capturedPiece = capturedP;
      player2Cap.appendChild(img);
    }
    root.childNodes.forEach((e) => {
      const i = e.dataset.cords.split(",")[0];
      const j = e.dataset.cords.split(",")[1];
      if ((parseInt(i) + parseInt(j)) % 2) {
        e.style.backgroundColor = "#8bc34ac7";
      } else {
        e.style.backgroundColor = "#ffff004d";
      }
    });
    nextBox.children[0].removeEventListener("mouseenter", showMoves);
    // nextBox.children[0].removeEventListener("mouseleave", hideMoves);
    nextBox.children[0].remove();
  }
  piece.currentPos = dest;
  return makeMove(piece);
};

const makeMove = (piece, castle = false) => {
  piece.displayPiece();
  const prevBox = document.querySelector(
    `[data-cords="${moveObj.selectedPiece.cords}"]`
  );
  prevBox.removeAttribute("data-code");
  prevBox.removeAttribute("data-color");
  prevBox.children[0].remove();
  moveObj.selectedPiece = {};
  moveObj.to = "";
  piecesArr.forEach((e) => e.calculateMoves());
  if (piece.initialmove == null) {
    piece.initialmove = true;
  } else {
    piece.initialmove = false;
  }
  piece.numMoves++;
  if (castle) {
    if (allMoves[allMoves.length - 1].castle) {
      if (allMoves[allMoves.length - 1].color !== piece.color) {
        Player.changeTurn(player1, player2);
        allMoves.push({
          color: piece.color,
          code: piece.code,
          move: piece.currentPos,
          castle,
        });
      }
    } else {
      Player.changeTurn(player1, player2);
      allMoves.push({
        color: piece.color,
        code: piece.code,
        move: piece.currentPos,
        castle,
      });
    }
  } else {
    Player.changeTurn(player1, player2);
    allMoves.push({
      color: piece.color,
      code: piece.code,
      move: piece.currentPos,
    });
  }
  return;
};
