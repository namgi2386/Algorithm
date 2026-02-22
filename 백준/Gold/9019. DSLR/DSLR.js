const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
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
function fnc(before, after) {
  const dp = new Array(10000).fill(5001);
  const ni = ["D", "S", "L", "R"];
  let minimumCnt = 5001;
  let answer = "";
  dp[before] = 0;
  let queue = new Queue();
  queue.push([before, ""]);
  while (queue.size() > 0) {
    const [num, str] = queue.pop();
    // console.log("in", num, str);

    const numCnt = dp[num];
    if (numCnt + 1 >= minimumCnt) continue;
    const nd = (num * 2) % 10000;
    const ns = num !== 0 ? num - 1 : 9999;
    const nl = ((num * 10) % 10000) + Math.floor(num / 1000);
    const nr = Math.floor(num / 10) + Math.floor(num % 10) * 1000;
    const nArr = [nd, ns, nl, nr];
    for (let i = 0; i < 4; i++) {
      const nc = nArr[i];
      if (dp[nc] <= numCnt + 1) continue;
      if (nc === after) {
        minimumCnt = numCnt + 1;
        answer = str + ni[i];
        break;
      }
      dp[nc] = numCnt + 1;
      queue.push([nc, str + ni[i]]);
    }
  }
  return answer;
}
for (let tc = 0; tc < Number(TC); tc++) {
  const [before, after] = arr[tc];
  const ans = fnc(before, after);
  console.log(ans);
}
