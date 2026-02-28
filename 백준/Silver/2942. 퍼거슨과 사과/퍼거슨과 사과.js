const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M] = inputValue.split(" ").map(BigInt);
// 최대공약수

function gcd(a, b) {
  while(b !== 0n) {
    var t = b;
    b = a % b;
    a = t;
  }
  return a;
}
const max = gcd(N, M);
const dn = N / max;
const dm = M / max;

for (let i = 1n; i * i <= max; i++) {
  if (max % i === 0n) {
    const j = max / i;
    console.log(`${i} ${j * dn} ${j * dm}`);
    if (i !== j) {
      console.log(`${j} ${i * dn} ${i * dm}`);
    }
  }
}
