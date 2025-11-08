const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = BigInt(inputValue);

const visited = new Array(1000000).fill(false);
let find = [];
for (let i = 2; i < 1000000; i++) {
  if (!visited[i]) {
    let d = 2;
    find.push(i);
    while (i * d < 1000000) {
      visited[i * d] = true;
      d++;
    }
  }
}

function GCD(n) {
  let map = new Map();
  find.forEach((idx) => {
    idx = BigInt(idx);
    while (n > 1 && n >= idx) {
      if (n % idx === 0n) {
        map.set(idx, (map.get(idx) || 0n) + 1n);
        n /= idx;
        continue;
      }
      break;
    }
  });
  if (n !== 1n) {
    map.set(n, 1n);
  }
  return map;
}
const map = GCD(N);

let answer = 1n;
// console.log(map);

for (const [p, q] of map) {
  answer *= p ** (q - 1n) * (p - 1n);
}
console.log(Number(answer));
