const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n");
const [N, M] = initN.split(" ");
board = board.map((c) => c.trim().split(""));

function isValid(r, c) {
  return 0 <= r && r < N && 0 <= c && c < M;
}

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

function bfs(initR, initC) {
  const stack = [[initR, initC]];
  board[initR][initC] = "e";
  let result = 0;
  while (stack.length > 0) {
    const [pr, pc] = stack.pop();
    for (let d = 0; d < 4; d++) {
      const [nr, nc] = [pr + dr[d], pc + dc[d]];
      if (!isValid(nr, nc)) continue;
      const type = board[nr][nc];
      if (type === "O" || type === "P") {
        if (type === "P") result++;
        stack.push([nr, nc]);
        board[nr][nc] = "e";
      }
    }
  }
  return result;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "I") {
      const answer = bfs(i, j);
      console.log(answer === 0 ? "TT" : answer);
    }
  }
}
