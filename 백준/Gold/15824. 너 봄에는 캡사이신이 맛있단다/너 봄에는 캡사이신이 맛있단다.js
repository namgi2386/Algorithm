const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
arr.sort((a, b) => a - b);

const MOD = 1000000007n;  // BigInt로 변환

const binArr = new Array(N).fill(0n);
binArr[0] = 1n;
for (let i = 1; i < N; i++) {
  binArr[i] = (binArr[i - 1] * 2n) % MOD;
}

let answer = 0n;

for (let i = 0; i < N; i++) {
  // BigInt로 곱셈
  answer = (answer + (BigInt(arr[i]) * binArr[i]) % MOD) % MOD;
  answer = (answer - (BigInt(arr[i]) * binArr[N - 1 - i]) % MOD + MOD) % MOD;
}

console.log(Number(answer));  // 최종 출력은 Number로