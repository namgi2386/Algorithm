const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let N = Number(inputValue.split("\n")[0]);
let arr = inputValue.split("\n")[1].split(" ").map(Number);
arr.sort((a, b) => a - b);
let answer = 0;
for (let i = 0; i < N; i++) {
  answer += arr[i] * (N - i);
}
console.log(answer);
