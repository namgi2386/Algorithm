const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const N = +lines[0];
const board = [];

for (let i = 1; i <= N; i++) {
  board.push(lines[i].trim().split(""));
}

let answer = Infinity;

// 모든 행 조합 (2^N)
for (let rowMark = 0; rowMark < 1 << N; rowMark++) {
  let cnt = 0;

  // 열순회
  for (let c = 0; c < N; c++) {
    let tCount = 0;

    // 현재 열에 대해, 뒤집을 행 뒤집고 남은 놈들
    for (let r = 0; r < N; r++) {
      // 뒤집기
      let coin = board[r][c];
      if (rowMark & (1 << r)) {
        coin = coin === "H" ? "T" : "H";
      }
      if (coin === "T") tCount++;
    }

    // 현재 열 or 정반대 중 작은거만 기록
    cnt += Math.min(tCount, N - tCount);
  }

  answer = Math.min(answer, cnt);
}

process.stdout.write(answer.toString());
