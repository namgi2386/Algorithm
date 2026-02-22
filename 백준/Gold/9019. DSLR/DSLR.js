const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

const MAX = 10000;

const dp = new Array(MAX);
const prev = new Array(MAX); // 출처
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
    const nl = ((num * 10) % 10000) + Math.floor(num / 1000);
    const nr = Math.floor(num / 10) + Math.floor(num % 10) * 1000;
    const nArr = [nd, ns, nl, nr];
    for (let i = 0; i < 4; i++) {
      const nc = nArr[i]; // 다음 값
      if (dp[nc] === tc + 1) continue;
      dp[nc] = tc + 1;
      prev[nc] = [num, i];
      if (nc === after) {
        return;
      }
      queue.push(nc);
    }
  }
}
for (let tc = 0; tc < Number(TC); tc++) {
  const [before, after] = arr[tc];
  fnc(tc, before, after);

  const path = [];
  let cur = after;
  while (cur !== before) {
    path.push(codeToChar[prev[cur][1]]); // 변환을 위한 커멘드 값
    cur = prev[cur][0]; // 출처 (변환전 값)
  }
  console.log(path.reverse().join(""));
}
