const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, M, ...arr2] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
N = Number(N);
M = Number(M);
let answer = [];
for (const cc of arr2) {
  let result = 0;
  for (let i = cc[0] - 1; i < cc[1]; i++) {
    result += arr[i];
  }
  answer.push(result);
}
console.log(answer.join("\n"));
