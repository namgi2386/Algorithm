const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...board] = inputValue.split("\n");
N = Number(N);
board = board.map((c) => c.trim().split(""));

function isValid(r, c) {
  return 0 <= r && r < N && 0 <= c && c < N;
}

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

function bfs(initR, initC) {
  const stack = [[initR, initC]];
  board[initR][initC] = "e";
  let result = 1;
  while (stack.length > 0) {
    const [pr, pc] = stack.pop();
    for (let d = 0; d < 4; d++) {
      const [nr, nc] = [pr + dr[d], pc + dc[d]];
      if (!isValid(nr, nc)) continue;
      if (board[nr][nc] === "1") {
        stack.push([nr, nc]);
        board[nr][nc] = "e";
        result++;
      }
    }
  }
  return result;
}
let answer = [];
let cnt = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === "1") {
      answer.push(bfs(i, j));
      cnt++;
    }
  }
}
console.log(cnt);

console.log(answer.sort((a, b) => a - b).join("\n"));
