const data = require("fs")
  .readFileSync(0, "utf8")
  .trim()
  .split(/\s+/)
  .map(Number);

let i = 0;
const TC = data[i++]; // 3188 -> 2808

const MAX = 10000;

const dp = new Array(MAX);
const prev = new Uint16Array(MAX); // 5200 -> 3188
const move = new Uint8Array(MAX);
const codeToChar = ["", "D", "S", "L", "R"];

const q = new Uint16Array(MAX); // 2808 -> 2928

function fnc(tc, before, after) {
  let [tail, head] = [0, 0];
  q[tail++] = before;
  dp[before] = tc + 1;

  while (head < tail) {
    const num = q[head++];
    if (num === after) return;

    const nd = (num * 2) % 10000;
    const ns = num !== 0 ? num - 1 : 9999;
    const nl = (num % 1000) * 10 + ((num / 1000) | 0);
    const nr = ((num / 10) | 0) + (num % 10) * 1000;

    if (dp[nd] !== tc + 1) {
      dp[nd] = tc + 1;
      prev[nd] = num;
      move[nd] = 1;
      if (nd === after) {
        return;
      }
      q[tail++] = nd;
    }
    if (dp[ns] !== tc + 1) {
      dp[ns] = tc + 1;
      prev[ns] = num;
      move[ns] = 2;
      if (ns === after) {
        return;
      }
      q[tail++] = ns;
    }
    if (dp[nl] !== tc + 1) {
      dp[nl] = tc + 1;
      prev[nl] = num;
      move[nl] = 3;
      if (nl === after) {
        return;
      }
      q[tail++] = nl;
    }
    if (dp[nr] !== tc + 1) {
      dp[nr] = tc + 1;
      prev[nr] = num;
      move[nr] = 4;
      if (nr === after) {
        return;
      }
      q[tail++] = nr;
    }
  }
}
const answer = [];
for (let tc = 0; tc < Number(TC); tc++) {
  const before = data[i++];
  const after = data[i++];
  fnc(tc, before, after);

  const path = [];
  let cur = after;
  while (cur !== before) {
    path.push(codeToChar[move[cur]]); // 변환을 위한 커멘드 값
    cur = prev[cur]; // 출처 (변환전 값)
  }
  answer.push(path.reverse().join(""));
}
console.log(answer.join("\n"));
