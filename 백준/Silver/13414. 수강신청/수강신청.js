const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initValue, ...arr] = inputValue.split("\n").map((c) => c.trim());
let [Target, N] = initValue.split(" ").map(Number);
let map = new Map();
for (let i = 0; i < N; i++) {
  map.set(arr[i], i);
}
console.log(
  [...map]
    .sort((a, b) => a[1] - b[1])
    .slice(0, Target)
    .map((c) => c[0])
    .join("\n")
);
