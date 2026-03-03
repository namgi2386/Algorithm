const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
//0  0
//1  1            2              3                    4
//2  5678    9,10,11,12     13,14,15,16          17,18,19,20
//3  21,22,23,24 25,26,27,28
let answer = [0, 0];
function dfs(sr, er, sc, ec) {
  if (sr === er && sc === ec) {
    return arr[sr][sc];
  }
  const rt = (er + sr - 1) / 2;
  const ct = (sc + ec - 1) / 2;
  const n1 = dfs(sr, rt, sc, ct);
  const n2 = dfs(sr, rt, ct + 1, ec);
  const n3 = dfs(rt + 1, er, sc, ct);
  const n4 = dfs(rt + 1, er, ct + 1, ec);
  if (n1 === 1 && n2 === 1 && n3 === 1 && n4 === 1) {
    return 1;
  } else if (n1 === 0 && n2 === 0 && n3 === 0 && n4 === 0) {
    return 0;
  } else {
    for (const c of [n1, n2, n3, n4]) {
      if (c === 1) {
        answer[1]++;
      } else if (c === 0) {
        answer[0]++;
      }
    }
    return 2;
  }
}
// 0 7 0 7
const last = dfs(0, N - 1, 0, N - 1);
if (last === 1) {
  answer[1]++;
} else if (last === 0) {
  answer[0]++;
}
console.log(answer.join("\n"));
