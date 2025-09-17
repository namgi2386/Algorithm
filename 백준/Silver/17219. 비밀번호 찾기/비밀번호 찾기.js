const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [init, ...arr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = init.split(" ").map(Number);
let map = new Map();
for (let i = 0; i < N; i++) {
  let [k, v] = arr[i].split(" ");
  map.set(k, v);
}
for (let i = N; i < N + M; i++) {
  console.log(map.get(arr[i]));
}
