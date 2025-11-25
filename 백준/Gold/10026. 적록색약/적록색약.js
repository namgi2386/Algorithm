const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...board] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
board = board.map((c) => c.split(""));

function isValid(r, c) {
  return r >= 0 && r < N && c >= 0 && c < N;
}

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

function fnc(type, initR, initC, check) {
  const stack = [[initR, initC]];
  while (stack.length > 0) {
    const [pr, pc] = stack.pop();
    for (let d = 0; d < 4; d++) {
      const [nr, nc] = [pr + dr[d], pc + dc[d]];
      if (!isValid(nr, nc)) continue;
      if (board[nr][nc] === type) {
        stack.push([nr, nc]);
        board[nr][nc] = check ? type.toLowerCase() : type.toUpperCase();
      }
    }
  }
}

let answer = [0, 0];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    let type = board[i][j];
    if (type === "R" || type === "B" || type === "G") {
      board[i][j] = type.toLowerCase();
      fnc(type, i, j, true);
      answer[0]++;
    }
  }
}
// console.log(board);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    const type = board[i][j];
    if (type === "r") {
      board[i][j] = "g";
    }
  }
}
// console.log(board);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    let type = board[i][j];
    if (type === "b" || type === "g") {
      board[i][j] = type.toUpperCase();
      fnc(type, i, j, false);
      answer[1]++;
    }
  }
}

console.log(answer.join(" "));
