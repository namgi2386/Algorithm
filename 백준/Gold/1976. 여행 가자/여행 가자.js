const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
M = Number(M);
let validArr = initArr.pop().split(" ").map(Number);

let parents = new Array(N).fill(0).map((c, i) => i);

function find(n) {
  if (parents[n] === n) return n;
  parents[n] = find(parents[n]);
  return parents[n];
}
function union(a, b) {
  let x = find(a);
  let y = find(b);
  if (x !== y) parents[y] = x;
}

for (let i = 0; i < N; i++) {
  let arr = initArr[i].split(" ").map(Number);
  for (let j = i; j < N; j++) {
    if (arr[j] === 1) {
      union(i, j);
    }
  }
}
let answer = "YES";
for (let i = 1; i < M; i++) {
  if (find(validArr[i] - 1) !== find(validArr[i - 1] - 1)) {
    answer = "NO";
    break;
  }
}
// console.log(parents);

console.log(answer);
