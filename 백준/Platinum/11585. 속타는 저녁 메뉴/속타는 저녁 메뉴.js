const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, myArr, board] = inputValue.split("\n").map((c) => c.trim().split(" "));
N = Number(N);

function getgcd(a, b) {
  if (a < b) [a, b] = [b, a];
  while (true) {
    if (b === 0) return a;
    [a, b] = [b, a % b];
  }
}

let jIdx = 0;
let failArr = new Array(N).fill(0);
for (let i = 1; i < N; i++) {
  while (myArr[i] !== myArr[jIdx] && jIdx > 0) {
    jIdx = failArr[jIdx - 1];
  }
  if (myArr[i] === myArr[jIdx]) failArr[i] = ++jIdx;
}
if (N % (N - failArr[N - 1]) === 0) {
  const temp = Math.floor(N / (N - failArr[N - 1]));
  const gcd = getgcd(N, temp);
  console.log(`${temp / gcd}/${N / gcd}`);
} else {
  console.log(`1/${N}`);
}
