const fs = require("fs");
// const inputValue = fs.readFileSync("input.txt").toString().trim();
const inputValue = fs.readFileSync("/dev/stdin").toString().trim();
const inputs = inputValue.split("\n");
const N = parseInt(inputs[0]);
for (let tc = 1; tc < N + 1; tc++) {
  let stack = 0;
  let answer = true;
  inputs[tc].split("").forEach((c) => {
    if (c === "(") {
      stack++;
    }
    if (c === ")") {
      if (stack > 0) stack--;
      else {
        answer = false;
      }
    }
  });
  if (stack !== 0) answer = false;
  console.log(answer ? "YES" : "NO");
}
