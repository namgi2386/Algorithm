const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [S, E] = inputValue.split(" ").map(BigInt);
const N = Number(E - S);
// console.log("init:", S, E, N);
// 2 초	512 MB
// S 최대 1조ㅋ
// 총 개수는 최대 100만
let answer = N + 1;
const visited = Array(Number(N) + 1).fill(false);
let idx = 2n;
while (idx ** 2n <= E) {
  const pd = idx ** 2n;
  let sd = ~~(S / pd);
  let ed = ~~(E / pd);
  for (let i = sd; i <= ed; i += 1n) {
    const num = Number(pd * i - S);
    if (num < 0) continue;
    // console.log("idx:", Number(pd * i - S), "num:", pd * i);
    if (!visited[num]) {
      visited[num] = true;
      answer--;
    }
    visited[num] = true;
  }
  idx += 1n;
}
console.log(answer);

// console.log(visited.join("|"));
