const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
const map = new Map();
for (let i = 0; i < N; i++) {
  map.set(arr[i], (map.get(arr[i]) || 0) + 1);
}
for (let i = N; i < 2 * N - 1; i++) {
  map.set(arr[i], map.get(arr[i]) - 1);
}
for (const c of map) {
  if (c[1] !== 0) {
    console.log(c[0]);
    break;
  }
}
