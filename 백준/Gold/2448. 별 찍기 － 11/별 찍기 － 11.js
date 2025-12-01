const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = Number(inputValue);
const K = Math.log2(N / 3);
const M = 6 * 2 ** K - 1;
const Q = "*";

const board = Array.from({ length: N }, () => new Array(M).fill(" "));
const CENTER = Math.floor(M / 2);

const stack = [[0, CENTER]];
const blackSet = new Set();

while (stack.length > 0 || stack.length > 0) {
  const [pr, pc] = stack.shift();
  if (blackSet.has(`${pr},${pc}`)) continue;

  // 3단 색칠하기
  board[pr][pc] = Q;
  board[pr + 1][pc - 1] = Q;
  board[pr + 1][pc + 1] = Q;
  for (let i = -2; i < 3; i++) {
    board[pr + 2][pc + i] = Q;
  }
  // 왼쪽
  if (pc - 4 >= 0) {
    // 우선 넣기
    if (board[pr + 2][pc - 4] !== Q) {
      stack.push([pr + 3, pc - 3]);
    } else {
      // 이미 추가된 상태 => 블랙리스트 등록
      blackSet.add(`${pr + 3},${pc - 3}`);
    }
  }
  // 오른쪽
  if (pc + 4 < M) {
    // 우선 넣기
    if (board[pr + 2][pc + 4] !== Q) {
      stack.push([pr + 3, pc + 3]);
    } else {
      // 이미 추가된 상태 => 블랙리스트 등록
      blackSet.add(`${pr + 3},${pc + 3}`);
    }
  }
}
console.log(board.map((c) => c.join("")).join("\n"));
