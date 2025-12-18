const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n").map((c) => c.trim());
const [N, M] = initN.split(" ").map(Number);
board = board.map((c) => c.split("").map(Number));
let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const num1 = board[i][j];
    for (let x = i + 1; x < N; x++) {
      for (let y = j + 1; y < M; y++) {
        const num2 = board[x][y];
        const num3 = board[i][y];
        const num4 = board[x][j];
        if (
          num1 === num2 &&
          num2 === num3 &&
          num3 === num4 &&
          x - i === y - j
        ) {
          answer = Math.max(answer, (x - i + 1) * (y - j + 1));
        }
      }
    }
  }
}
console.log(answer === 0 ? 1 : answer);
