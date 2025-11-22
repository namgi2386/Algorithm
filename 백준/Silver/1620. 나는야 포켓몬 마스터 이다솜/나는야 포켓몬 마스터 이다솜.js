const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n").map((c) => c.trim());
const [N, M] = initN.split(" ").map(Number);
const map = new Map();
const poke = new Array(N + 1).fill("");
for (let i = 0; i < N; i++) {
  map.set(arr[i], i + 1);
  poke[i + 1] = arr[i];
}
const answer = [];
for (let i = N; i < N + M; i++) {
  answer.push(map.get(arr[i]) || poke[Number(arr[i])]);
}
console.log(answer.join("\n"));
