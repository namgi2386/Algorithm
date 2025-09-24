const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n").map((c) => c.trim());

let [N, M] = initN.split(" ").map(Number);
// N : node수
// M : line수
let queue = [];
let childs = Array.from({ length: N + 1 }).map(() => []);
let parentCnt = Array(N + 1).fill(0);
for (let i = 0; i < M; i++) {
  let [s, e] = arr[i].split(" ").map(Number);
  childs[s].push(e);
  parentCnt[e]++;
}
for (let i = 1; i < N + 1; i++) {
  if (parentCnt[i] === 0) queue.push(i);
}
let answer = [];
while (queue.length > 0) {
  // console.log(queue);

  let idx = queue.pop();
  answer.push(idx);
  for (c of childs[idx]) {
    if (--parentCnt[c] === 0) queue.push(c);
  }
}
console.log(answer.join(" "));
