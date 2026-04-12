class Vertex {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function flatIndex(v) {
  return v[0] - 1 + 8 * (v[1] - 1);
}

function gridIndex(ind) {
  return [(ind % 8) + 1, Math.floor(ind / 8) + 1];
}

function isValid(x, y) {
  if (x > 8 || x < 1 || y > 8 || y < 1) return false;
  else return true;
}

function availableMoves(v) {
  let res = [];
  if (isValid(v[0] + 2, v[1] + 1)) res.push([v[0] + 2, v[1] + 1]);
  if (isValid(v[0] + 1, v[1] + 2)) res.push([v[0] + 1, v[1] + 2]);
  if (isValid(v[0] - 2, v[1] + 1)) res.push([v[0] - 2, v[1] + 1]);
  if (isValid(v[0] - 1, v[1] + 2)) res.push([v[0] - 1, v[1] + 2]);
  if (isValid(v[0] - 2, v[1] - 1)) res.push([v[0] - 2, v[1] - 1]);
  if (isValid(v[0] - 1, v[1] - 2)) res.push([v[0] - 1, v[1] - 2]);
  if (isValid(v[0] + 1, v[1] - 2)) res.push([v[0] + 1, v[1] - 2]);
  if (isValid(v[0] + 2, v[1] - 1)) res.push([v[0] + 2, v[1] - 1]);
  return res;
}

function genAdjList() {
  let board = Array(64);
  for (let i = 0; i < 64; i++) {
    board[i] = availableMoves(gridIndex(i));
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
  dist[flatIndex(source)] = 0;

  while (q.length > 0) {
    let node = q.shift();
    res.push(node);

    let ind = flatIndex(node); // index corresponding to position (x,y) in adjacency list
    for (let j = 0; j < graph[ind].length; j++) {
      let neighbour = graph[ind][j];
      let neighbourIndex = flatIndex(neighbour);
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

  while (par[flatIndex(curr)][0] !== -1 && par[flatIndex(curr)][0] !== -1) {
    path.push(par[flatIndex(curr)]);
    curr = par[flatIndex(curr)];
  }

  const result = path.reverse();
  return result;
}

function knightMoves(source, dest) {
  const board = genAdjList();
  const path = getPath(source, board, dest);

  if (path.length > 0) {
    console.log(`You made it in ${path.length} moves! Here's your path:`);
    for (let i = 0; i < path.length; i++) {
      console.log(path[i]);
    }
    console.log(dest);
  }
}

knightMoves([3, 3], [4, 3]);
