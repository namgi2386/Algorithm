const fs = require("fs");
const data = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

let i = 0;
const TC = data[i++];

const MAX = 10000;

const dp = new Array(MAX);
const prev = new Uint16Array(MAX);
const move = new Uint8Array(MAX);
const codeToChar = ["D", "S", "L", "R"];

class Queue {
  constructor() {
    this.list = [];
    this.index = 0;
    this.peek = 0;
  }
  push(val) {
    this.list.push(val);
    this.index++;
  }
  pop() {
    if (this.index === this.peek) return null;
    return this.list[this.peek++];
  }
  size() {
    return this.index - this.peek;
  }
}

function fnc(tc, before, after) {
  const queue = new Queue();
  queue.push(before);
  dp[before] = tc + 1;

  while (queue.size() > 0) {
    const num = queue.pop();
    if (num === after) return;

    const nd = (num * 2) % 10000;
    const ns = num !== 0 ? num - 1 : 9999;
    const nl = (num % 1000) * 10 + ((num / 1000) | 0);
    const nr = ((num / 10) | 0) + (num % 10) * 1000;
    const nArr = [nd, ns, nl, nr];
    for (let i = 0; i < 4; i++) {
      const nc = nArr[i]; // 다음 값
      if (dp[nc] === tc + 1) continue;
      dp[nc] = tc + 1;
      prev[nc] = num;
      move[nc] = i;
      if (nc === after) {
        return;
      }
      queue.push(nc);
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
