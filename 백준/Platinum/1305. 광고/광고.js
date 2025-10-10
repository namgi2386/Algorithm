const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
arr = arr.split("");

let kmp = Array(N).fill(0);
let j = 0;
for (let i = 1; i < N; i++) {
  // console.log(i, j, arr[i], arr[j]);
  while (arr[i] !== arr[j] && j > 0) {
    j = kmp[j - 1];
  }

  if (arr[i] === arr[j]) kmp[i] = ++j;
}
console.log(N - kmp[N - 1]);
