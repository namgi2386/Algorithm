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
const mid = Math.sqrt(max);
const answer = [];
for (let i = 1; i < mid; i++) {
  if (max % i === 0) {
    const j = max / i;
    answer.push(`${i} ${j * dn} ${j * dm}`);
    answer.push(`${j} ${i * dn} ${i * dm}`);
  }
}
if (mid === Math.floor(mid)) {
  answer.push(`${mid} ${mid * dn} ${mid * dm}`);
}
process.stdout.write(answer.join("\n"));
