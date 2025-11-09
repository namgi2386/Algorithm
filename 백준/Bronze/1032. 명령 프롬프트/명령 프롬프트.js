const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split(/\r?\n/);
const N = Number(lines[0]);
const files = lines.slice(1, N + 1).map(s => s.split(""));

let answer = files[0];
for (let i = 1; i < N; i++) {
  files[i].forEach((c, idx) => {
    if (answer[idx] !== c) {
      answer[idx] = "?";
    }
  });
}

console.log(answer.join(""));