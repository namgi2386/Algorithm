const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = BigInt(inputValue.trim());
const MOD = 1000000007n;
let graph = [
  [1, 2],
  [0, 2, 3],
  [0, 1, 3, 4],
  [1, 2, 4, 5],
  [2, 3, 5, 6],
  [3, 4, 7],
  [4, 7],
  [5, 6],
];

const H = N.toString(2).length; // 비트 길이
let dp = Array.from({ length: 8 }, () =>
  Array.from({ length: 8 }, () => new Array(H).fill(0n))
);

// 초기화: 길이 1인 경로 (인접 간선)
for (let i = 0; i < 8; i++) {
  for (let adj of graph[i]) {
    dp[i][adj][0] = 1n;
  }
}

// 분할정복 DP
for (let cost = 1; cost < H; cost++) {
  for (let s = 0; s < 8; s++) {
    for (let e = 0; e < 8; e++) {
      for (let k = 0; k < 8; k++) {
        dp[s][e][cost] += (dp[s][k][cost - 1] * dp[k][e][cost - 1]) % MOD;
        dp[s][e][cost] %= MOD;
      }
    }
  }
}

// N을 이진수로 분해해서 답 구하기
let ans = Array.from({ length: 8 }, (_, i) =>
  Array.from({ length: 8 }, (_, j) => (i === j ? 1n : 0n))
);

for (let bit = 0; bit < H; bit++) {
  if (N & (1n << BigInt(bit))) {
    let temp = Array.from({ length: 8 }, () => Array(8).fill(0n));
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 8; k++) {
          temp[i][j] += (ans[i][k] * dp[k][j][bit]) % MOD;
          temp[i][j] %= MOD;
        }
      }
    }
    ans = temp;
  }
}

console.log(ans[0][0].toString());