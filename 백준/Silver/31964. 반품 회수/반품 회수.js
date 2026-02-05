const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr1, arr2] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
[arr1, arr2] = [arr1, arr2].map((c) => c.split(" ").map(Number));
let prev = arr1[N - 1];
let max = arr1[N - 1];
for (let i = N - 1; i >= 0; i--) {
  max += prev - arr1[i];
  prev = arr1[i];
  if (arr2[i] > max) {
    max += arr2[i] - max;
  }
}
console.log(max + arr1[0]);
