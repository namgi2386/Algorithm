const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...board] = inputValue.split("\n").map((c) => c.trim());
// N과 M은 최대 50 (총2500칸)
let [N, M] = initN.split(" ").map(Number);
board = board.map((c) => c.split("").map(Number));
// console.log(board.map((c) => c.join("")));
// console.log("---------");

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

function isValid(r, c, k) {
  if (0 > r || r > N - 1 || 0 > c || c > M - 1) {
    return false;
  }
  if (board[r][c] < k) return false;
  if (board[r][c] === k && (r === 0 || r === N - 1 || c === 0 || c === M - 1))
    return false;
  return true;
}
let answer = 0;
function bfs(r, c, k) {
  let stack = [[r, c]];
  let visited = Array.from({ length: N }, () => new Array(M).fill(false));
  visited[r][c] = true;
  let maxNum = Infinity;
  while (stack.length > 0) {
    let [sr, sc] = stack.pop();
    for (let d = 0; d < 4; d++) {
      let [cr, cc] = [sr + dr[d], sc + dc[d]];
      if (!isValid(cr, cc, k)) {
        return;
      }
      if (visited[cr][cc]) continue;
      if (board[cr][cc] === k) {
        stack.push([cr, cc]);
        visited[cr][cc] = true;
      } else if (board[cr][cc] < maxNum) maxNum = board[cr][cc];
    }
  }
  let myNum = maxNum - k;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j]) {
        board[i][j] = maxNum;
        answer += myNum;
      }
    }
  }
}

for (let k = 1; k < 8; k++) {
  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      const center = board[i][j];
      if (center === k) {
        bfs(i, j, k);
        // console.log(answer, k, i, j);
      }
    }
  }
}
console.log(answer);
