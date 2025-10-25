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
    if (this.queue.size === 0) return null;
    const val = this.queue.get(this.peek);
    this.queue.delete(this.peek++);
    return val;
  }
  size() {
    return this.idx - this.peek;
  }
}

const fireTime = Array.from({ length: N }, () => Array(M).fill(Infinity));
const jihunTime = Array.from({ length: N }, () => Array(M).fill(-1));

let fireQueue = new Queue();
let START = [];

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "J") {
      START = [i, j];
    }
    if (board[i][j] === "F") {
      fireQueue.push([i, j]);
      fireTime[i][j] = 0;
    }
  }
}

// 불 BFS
while (fireQueue.size() > 0) {
  const [r, c] = fireQueue.shift();
  for (let d = 0; d < 4; d++) {
    const [nr, nc] = [r + dr[d], c + dc[d]];
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    if (board[nr][nc] === "#") continue;
    if (fireTime[nr][nc] !== Infinity) continue;
    fireTime[nr][nc] = fireTime[r][c] + 1;
    fireQueue.push([nr, nc]);
  }
}

// 지훈이 BFS
let myQueue = new Queue();
myQueue.push([START[0], START[1]]);
jihunTime[START[0]][START[1]] = 0;

while (myQueue.size() > 0) {
  const [r, c] = myQueue.shift();
  
  // 탈출 체크
  if (r === 0 || c === 0 || r === N - 1 || c === M - 1) {
    console.log(jihunTime[r][c] + 1);
    process.exit(0);
  }
  
  for (let d = 0; d < 4; d++) {
    const [nr, nc] = [r + dr[d], c + dc[d]];
    if (nr < 0 || nr >= N || nc < 0 || nc >= M) continue;
    if (board[nr][nc] === "#") continue;
    if (jihunTime[nr][nc] !== -1) continue;
    
    // 지훈이가 다음 칸에 도착하는 시간이 불보다 빨라야 함
    if (jihunTime[r][c] + 1 >= fireTime[nr][nc]) continue;
    
    jihunTime[nr][nc] = jihunTime[r][c] + 1;
    myQueue.push([nr, nc]);
  }
}

console.log("IMPOSSIBLE");