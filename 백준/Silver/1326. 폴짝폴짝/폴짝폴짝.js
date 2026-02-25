const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, initN] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
const [s, e] = initN.map((c) => c - 1);
const dp = new Array(N).fill(N + 1);
dp[s] = 0;

class Queue {
  constructor() {
    this.queue = [];
    this.index = 0;
    this.peek = 0;
  }
  push(val) {
    this.queue.push(val);
    this.index += 1;
  }
  shift() {
    if (this.index === this.peek) return null;
    return this.queue[this.peek++];
  }
  size() {
    return this.index - this.peek;
  }
}
const queue = new Queue();
queue.push([s, 0]);

while (queue.size() > 0) {
  const [node, cnt] = queue.shift();

  let jump = arr[node];
  for (let i = 1; node + jump * i < N; i++) {
    const next = node + jump * i;
    if (dp[next] < cnt + 1) continue;
    dp[next] = cnt + 1;
    queue.push([next, cnt + 1]);
  }
  for (let i = 1; node - jump * i >= 0; i++) {
    const next = node - jump * i;
    if (dp[next] < cnt + 1) continue;
    dp[next] = cnt + 1;
    queue.push([next, cnt + 1]);
  }
}
console.log(dp[e] !== N + 1 ? dp[e] : -1);
