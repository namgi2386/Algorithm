const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split(/\r?\n/);
const N = Number(lines[0]);
const arr = lines.slice(1, N + 1).map(s => s.split(""));

let answer = arr[0];
for (let i = 1; i < N; i++) {
  arr[i].forEach((c, idx) => {
    if (answer[idx] !== c) {
      answer[idx] = "?";
    }
  });
}

console.log(answer.join(""));