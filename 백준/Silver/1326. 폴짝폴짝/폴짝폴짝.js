const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, initN] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
const [s, e] = initN.map((c) => c - 1);
const dp = new Array(N).fill(Infinity);
dp[s] = 0;
const stack = [[s, 0]];

while (stack.length > 0) {
  const [node, cnt] = stack.shift();

  let jump = arr[node];
  for (let i = 1; node + jump * i < N; i++) {
    const next = node + jump * i;
    if (dp[next] < cnt + 1) continue;
    dp[next] = cnt + 1;
    // console.log("a", node, jump, next, cnt + 1);
    stack.push([next, cnt + 1]);
  }
  for (let i = 1; node - jump * i >= 0; i++) {
    const next = node - jump * i;
    if (dp[next] < cnt + 1) continue;
    dp[next] = cnt + 1;
    // console.log("b", node, jump, next, cnt + 1);
    stack.push([next, cnt + 1]);
  }
}
console.log(dp[e] !== Infinity ? dp[e] : -1);
