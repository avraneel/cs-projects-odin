class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function flatIndex(x, y) {
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

/**
 * @param s [x,y] vertex
 * @param graph Adjacency List
 */
function bfs(source, graph, par, dist) {
  const res = [];
  const q = [];

  // Initialize root node
  q.push(source);
  dist[flatIndex(source[0], source[1])] = 0;

  while (q.length > 0) {
    let node = q.shift();
    res.push(node);

    let ind = flatIndex(node[0], node[1]); // index corresponding to position (x,y) in adjacency list
    for (let j = 0; j < graph[ind].length; j++) {
      let neighbour = graph[ind][j];
      let neighbourIndex = flatIndex(neighbour[0], neighbour[1]);
      if (dist[neighbourIndex] == Infinity) {
        q.push(neighbour);
        par[neighbourIndex] = node;
        dist[neighbourIndex] = dist[ind] + 1;
      }
    }
  }

  return res;
}

function getPath(source, graph, dest) {
  const par = Array(64).fill([-1, -1]);
  const dist = Array(64).fill(Infinity);

  bfs(source, graph, par, dist);

  if (dist[dest] === Infinity) {
    console.log("Source and Destination are not connected");
  }

  const path = [];
  let curr = dest;

  while (
    par[flatIndex(curr[0], curr[1])][0] !== -1 &&
    par[flatIndex(curr[0], curr[1])][0] !== -1
  ) {
    path.push(par[flatIndex(curr[0], curr[1])]);
    curr = par[flatIndex(curr[0], curr[1])];
  }

  const pathString = path.reverse().join(" ");
  console.log(pathString);
}

const board = genAdjList();
console.log(getPath([3, 3], board, [4, 3]));
