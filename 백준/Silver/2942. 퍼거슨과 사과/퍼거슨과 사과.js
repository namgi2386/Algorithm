const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M] = inputValue.split(" ").map(BigInt);
// 최대공약수

function fnc(a, b) {
  if (a < b) {
    [a, b] = [b, a];
  }
  if (b === 0n) {
    return a;
  }
  return fnc(a % b, b);
}
const max = fnc(N, M);

for (let i = 1n; i * i <= max; i++) {

  if (max % i === 0n) {
    console.log(`${i} ${N / i} ${M / i}`);
    const j = max / i;
    if (i !== j) {
      console.log(`${j} ${N / j} ${M / j}`);
    }
  }
}
