const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map(Number);
const MOD = 10000003;

function gcd(a, b) {
  while (b !== 0) {
    let temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

let dp = new Map();

for (let i = 0; i < N; i++) {
  let newDp = new Map();
  
  // 새 원소 단독
  newDp.set(arr[i], (newDp.get(arr[i]) || 0) + 1);
  
  // 기존 gcd들과 조합
  for (let [g, cnt] of dp) {
    let newGcd = gcd(g, arr[i]);
    newDp.set(newGcd, ((newDp.get(newGcd) || 0) + cnt) % MOD);
    newDp.set(g, ((newDp.get(g) || 0) + cnt) % MOD);
  }
  
  dp = newDp;
}

console.log((dp.get(1) || 0) % MOD);