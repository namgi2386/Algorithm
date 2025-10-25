const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);
board = board.map((c) => c.split(""));

class Queue {
  constructor() {
    this.queue = new Map();
    this.peek = 0;
    this.idx = 0;
  }
  push(val) {
    this.queue.set(this.idx++, val);
  }
  shift() {
    if (this.queue.size === 0) return [[-1, -1], {}, 0];
    return this.queue.get(this.peek++);
  }
  size() {
    return this.idx - this.peek;
  }
}

let myQueue = new Queue();
let fireQueue = new Queue();
let START = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "J") START = [i, j];
    if (board[i][j] === "F") fireQueue.push([i, j]);
  }
}

let visited = Array.from({ length: N }, () => Array(M).fill(false));
visited[START[0]][START[1]] = true;
myQueue.push([START[0], START[1]]);

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

function isValid(r, c) {
  if (0 > r || r >= N || 0 > c || c >= M) return false;
  if (board[r][c] === "#") return false;
  return true;
}

function spreadFire() {
  let fireSize = fireQueue.size();
  for (let i = 0; i < fireSize; i++) {
    let [fr, fc] = fireQueue.shift();
    for (let d = 0; d < 4; d++) {
      const [nr, nc] = [fr + dr[d], fc + dc[d]];
      if (!isValid(nr, nc)) continue;
      if (board[nr][nc] === "F") continue;
      board[nr][nc] = "F";
      fireQueue.push([nr, nc]);
    }
  }
}

function fnc() {
  let cost = 0;
  while (myQueue.size() > 0) {
    // 먼저 현재 턴에 탈출 가능한지 체크
    let Len = myQueue.size();
    for (let i = 0; i < Len; i++) {
      let [r, c] = myQueue.shift();
      
      // 현재 위치가 불이면 스킵
      if (board[r][c] === "F") continue;
      
      // 가장자리면 탈출
      if (r === 0 || c === 0 || r === N - 1 || c === M - 1) {
        return cost + 1;
      }

      for (let d = 0; d < 4; d++) {
        const [rr, cc] = [r + dr[d], c + dc[d]];
        if (!isValid(rr, cc)) continue;
        if (visited[rr][cc]) continue;
        if (board[rr][cc] === "F") continue;
        visited[rr][cc] = true;
        myQueue.push([rr, cc]);
      }
    }
    
    // 지훈이 이동 후 불 확산
    spreadFire();
    cost++;
  }
  return "IMPOSSIBLE";
}

console.log(fnc());