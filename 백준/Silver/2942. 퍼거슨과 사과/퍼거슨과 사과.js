const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M] = inputValue.split(" ").map(Number);

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const max = gcd(N, M);
const dn = N / max;
const dm = M / max;
let answer = "";

for (let i = 1; i * i <= max; i++) {
  if (max % i === 0) {
    const j = max / i;
    answer += `${i} ${j * dn} ${j * dm}\n`;
    if (i !== j) {
      answer += `${j} ${i * dn} ${i * dm}\n`;
    }
  }
}

console.log(answer.trim());