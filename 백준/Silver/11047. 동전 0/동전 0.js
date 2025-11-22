const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);
const coins = [];
for (let i = 0; i < N; i++) {
  coins.push(Number(arr[i]));
}
coins.sort((a, b) => b - a);
let answer = 0;
let idx = 0;
while (M > 0) {
  const coin = coins[idx];
  if (M >= coin) {
    const cnt = Math.floor(M / coin);
    M -= cnt * coin;
    answer += cnt;
  }
  idx++;
}
console.log(answer);
