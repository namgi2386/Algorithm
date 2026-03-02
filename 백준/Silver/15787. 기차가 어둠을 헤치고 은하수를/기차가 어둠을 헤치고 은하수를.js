const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [intN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [N, M] = intN;
// 좌석수가 20개 고정
const dp = new Array(N + 1).fill(0);
for (let i = 0; i < M; i++) {
  const type = arr[i][0];
  if (type === 1) {
    const [a, b] = [arr[i][1], arr[i][2]];
    dp[a] = dp[a] | (1 << (b - 1));
  } else if (type === 2) {
    const [a, b] = [arr[i][1], arr[i][2]];
    dp[a] = dp[a] & ~(1 << (b - 1));
  } else if (type === 4) {
    const a = arr[i][1];
    // 뒤로한칸
    dp[a] = dp[a] >> 1;
  } else if (type === 3) {
    const a = arr[i][1];
    // 앞으로 한칸
    dp[a] = (dp[a] << 1) & ~(1 << 20);
  }
}

// console.log(dp);

const set = new Set();
dp.slice(1).map((c) => set.add(c));
console.log(set.size);
