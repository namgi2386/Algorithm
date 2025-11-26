const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...board] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;

function isValid(r, c) {
  return r >= 0 && r < N && c >= 0 && c < M;
}

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

function dfs(pr, pc, visited, sum, result) {
  if (visited.size === 4) {
    // console.log("in:", visited, sum);

    return sum;
  }
  for (let d = 0; d < 4; d++) {
    const [nr, nc] = [pr + dr[d], pc + dc[d]];
    if (!isValid(nr, nc)) continue;
    if (visited.has(`${nr},${nc}`)) continue;
    visited.add(`${nr},${nc}`);
    result = Math.max(
      result,
      dfs(nr, nc, visited, sum + board[nr][nc], result)
    );
    visited.delete(`${nr},${nc}`);
  }
  return result;
}
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const visited = new Set();
    visited.add(`${i},${j}`);
    let sum = board[i][j];
    let result = 0;
    const temp = dfs(i, j, visited, sum, result);
    // console.log(i, j, "temp:", temp);
    answer = Math.max(answer, temp);
  }
}
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const stack = [];
    let sum = board[i][j];
    for (let d = 0; d < 4; d++) {
      const [nr, nc] = [i + dr[d], j + dc[d]];
      if (!isValid(nr, nc)) continue;
      stack.push(board[nr][nc]);
      sum += board[nr][nc];
    }
    if (stack.length === 3) {
      answer = Math.max(answer, sum);
    } else if (stack.length === 4) {
      for (const c of stack) {
        answer = Math.max(answer, sum - c);
      }
    }
  }
}
console.log(answer);
