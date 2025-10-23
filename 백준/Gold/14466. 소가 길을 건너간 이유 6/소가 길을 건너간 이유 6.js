const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
let [N, K, R] = initN;
let roads = arr.slice(0, R).map((c) => c.map((d) => d - 1)); // 0-indexed
let roadSet = new Set();
for (let i = 0; i < R; i++) {
  let [a, b, c, d] = roads[i];
  roadSet.add(`${a},${b},${c},${d}`);
  roadSet.add(`${c},${d},${a},${b}`);
}
let cows = arr.slice(R).map((c) => c.map((d) => d - 1)); // 0-indexed

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  pop() {
    if (this.size === 0) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    if (this.size === 0) this.tail = null;
    return value;
  }

  size() {
    return this.size;
  }
}

let board = Array.from({ length: N }, () => new Array(N).fill(0));

let dr = [-1, 1, 0, 0];
let dc = [0, 0, 1, -1];

function isValid(r, c, rr, cc) {
  if (rr < 0 || rr >= N || cc < 0 || cc >= N) return false; // 벽뚫
  if (board[rr][cc] !== 0) return false; // visited
  let str1 = `${r},${c},${rr},${cc}`;
  if (roadSet.has(str1)) return false; // 길
  return true;
}
function find(prevI, prevJ) {
  for (let i = prevI; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

function bfs() {
  let tatalCnt = 0;
  let [prevI, prevJ] = [0, 0];
  let num = 0;
  while (tatalCnt < N * N) {
    num++;

    let [r, c] = find(prevI, prevJ);
    if (r === -1 && c === -1) break;
    [prevI, prevJ] = [r, c];
    let queue = new Queue();
    queue.push([r, c]);
    board[r][c] = num;
    // let cnt = 0;
    while (queue.size > 0) {
      // cnt = Math.max(cnt, queue.size);
      let [r, c] = queue.pop();

      for (let d = 0; d < 4; d++) {
        let [rr, cc] = [r + dr[d], c + dc[d]];
        if (!isValid(r, c, rr, cc)) continue;
        board[rr][cc] = num;
        queue.push([rr, cc]);
      }
    }
    // console.log(board.join("\n"));
    // console.log(cnt);
  }
}
bfs();

let map = new Map();
for (const cow of cows) {
  let num = board[cow[0]][cow[1]];
  map.set(num, (map.get(num) || 0) + 1);
}
let answer = 0;
let mapArr = [...map];
for (let i = 0; i < mapArr.length; i++) {
  for (let j = i + 1; j < mapArr.length; j++) {
    answer += mapArr[i][1] * mapArr[j][1];
  }
}
console.log(answer);
