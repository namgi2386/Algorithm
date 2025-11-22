const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n").map((c) => c.trim());
const [N, M] = initN.split(" ").map(Number);
const set = new Set();
for (let i = 0; i < N; i++) {
  set.add(arr[i]);
}
const answer = [];
for (let i = N; i < N + M; i++) {
  if (set.has(arr[i])) {
    answer.push(arr[i]);
  }
}
console.log(answer.length);

console.log(answer.sort().join("\n"));
