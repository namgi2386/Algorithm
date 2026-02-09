const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n");
const [N, M] = initN.split(" ").map(Number);
board = board.map((c) => c.trim().split(""));

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

let [sr, sc, er, ec] = [-1, -1, -1, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "S") {
      [sr, sc] = [i, j];
    } else if (board[i][j] === "F") {
      [er, ec] = [i, j];
    } else if (board[i][j] === "g") {
      for (let d = 0; d < 4; d++) {
        const nr = i + dr[d];
        const nc = j + dc[d];
        if (!isValid(nr, nc)) continue;
        if (board[nr][nc] === ".") {
          board[nr][nc] = "l";
        }
      }
    }
  }
}

const visited = Array.from({ length: N }, () => new Array(M).fill([626, 626]));
visited[sr][sc] = [0, 0];

function isValid(r, c) {
  return 0 <= r && r < N && 0 <= c && c < M;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  compare(a, b) {
    if (a[2] !== b[2]) return a[2] - b[2];
    return a[3] - b[3];
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return result;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.compare(this.heap[idx], this.heap[parent]) < 0) {
        this.swap(idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (
        right < this.heap.length &&
        this.compare(this.heap[right], this.heap[left]) < 0
      ) {
        smaller = right;
      }
      if (this.compare(this.heap[idx], this.heap[smaller]) <= 0) {
        break;
      }
      this.swap(idx, smaller);
      idx = smaller;
    }
  }
  size() {
    return this.heap.length;
  }
}

const myHeap = new MinHeap();
myHeap.push([sr, sc, 0, 0]);

while (myHeap.size() > 0) {
  const [pr, pc, cnt, leap] = myHeap.pop();

  const [visitedCnt, visitedLeap] = visited[pr][pc];
  if (cnt > visitedCnt || (cnt === visitedCnt && leap > visitedLeap)) {
    continue;
  }

  for (let d = 0; d < 4; d++) {
    const nr = pr + dr[d];
    const nc = pc + dc[d];
    if (!isValid(nr, nc)) continue;
    const [nextCnt, nextLeap] = visited[nr][nc];
    const type = board[nr][nc];
    let [nowCnt, nowLeap] = [cnt, leap];
    if (type === "g") {
      nowCnt++;
    } else if (type === "l") {
      nowLeap++;
    }
    if (nowCnt > nextCnt || (nowCnt === nextCnt && nowLeap >= nextLeap))
      continue;
    myHeap.push([nr, nc, nowCnt, nowLeap]);
    visited[nr][nc] = [nowCnt, nowLeap];
  }
}

console.log(visited[er][ec].join(" "));
