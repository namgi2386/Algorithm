const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

let [N, M] = inputValue[0].split(" ").map(Number);
let [SR, SC] = [-1, -1];
let board = [];
for (let i = 0; i < N; i++) {
  board.push(inputValue[i + 1].split("").map(Number));
  if (SR === -1) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 2) {
        [SR, SC] = [i, j];
        break;
      }
    }
  }
}

function isValid(r, c) {
  return 0 <= r && r < N && 0 <= c && c < M;
}

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

let queue = [];
queue.push([SR, SC, 0]);
board[SR][SC] = 1;
let answer = -1;
while (queue.length > 0) {
  const [pr, pc, cnt] = queue.shift();
  for (let d = 0; d < 4; d++) {
    const nr = pr + dr[d];
    const nc = pc + dc[d];
    if (!isValid(nr, nc)) continue;
    const nextNode = board[nr][nc];
    if (nextNode === 1) continue;
    if (nextNode !== 0) {
      answer = cnt + 1;
      queue = [];
      break;
    }
    board[nr][nc] = 1;
    queue.push([nr, nc, cnt + 1]);
  }
}
if (answer === -1) {
  console.log("NIE");
} else {
  console.log("TAK");
  console.log(answer);
}
