class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function toFlatIndex(x, y) {
  return x - 1 + 8 * (y - 1);
}

function toGridIndex(ind) {
  return [(ind % 8) + 1, Math.floor(ind / 8) + 1];
}

function isValid(x, y) {
  if (x > 8 || x < 1 || y > 8 || y < 1) return false;
  else return true;
}

function availableMoves(x, y) {
  let res = [];
  if (isValid(x + 2, y + 1)) res.push([x + 2, y + 1]);
  if (isValid(x + 1, y + 2)) res.push([x + 1, y + 2]);
  if (isValid(x - 2, y + 1)) res.push([x - 2, y + 1]);
  if (isValid(x - 1, y + 2)) res.push([x - 1, y + 2]);
  if (isValid(x - 2, y - 1)) res.push([x - 2, y - 1]);
  if (isValid(x - 1, y - 2)) res.push([x - 1, y - 2]);
  if (isValid(x + 1, y - 2)) res.push([x + 1, y - 2]);
  if (isValid(x + 2, y - 1)) res.push([x + 2, y - 1]);
  return res;
}

function genAdjList() {
  let board = Array(64);
  for (let i = 0; i < 64; i++) {
    board[i] = availableMoves(toGridIndex(i)[0], toGridIndex(i)[1]);
  }
  return board;
}

console.log(genAdjList());
