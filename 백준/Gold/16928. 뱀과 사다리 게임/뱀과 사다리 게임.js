const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const ladder = new Map();
const snake = new Map();
const jump = new Map();
for (let i = 0; i < N + M; i++) {
  const [a, b] = initArr[i];
  jump.set(a, b);
  if (i < N) {
    ladder.set(a, b);
  } else {
    snake.set(a, b);
  }
}
const dp = new Array(101).fill(Infinity);
dp[1] = 0;
function find(node) {
  const cost = dp[node];
  for (let dice = 6; dice > 0; dice--) {
    if (jump.has(node + dice)) {
      const jumpedNode = jump.get(node + dice);
      if (dp[jumpedNode] > cost + 1) {
        dp[jumpedNode] = cost + 1;
        find(jumpedNode);
      }
    } else if (dp[node + dice] > cost + 1) {
      dp[node + dice] = cost + 1;
      find(node + dice);
    }
  }
}
find(1);
console.log(dp[100]);
