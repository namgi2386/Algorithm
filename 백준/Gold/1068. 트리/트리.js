const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, initArr, M] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
initArr = initArr.split(" ").map(Number);
M = Number(M);

let parent = Array(N).fill(-1);
let child = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  parent[i] = initArr[i];
  if (initArr[i] !== -1) child[initArr[i]].push(i);
}
let leapNodeCnt = 0;
for (let i = 0; i < N; i++) {
  if (child[i].length === 0) leapNodeCnt++;
}

// console.log("시작:", child);
function fnc(start) {
  let stack = [start];
  let answer = 0;
  while (stack.length > 0) {
    let node = stack.pop();
    // console.log(node, child[node]);

    if (child[node].length === 0) answer++;
    for (c of child[node]) {
      // console.log("push:", child[c]);

      stack.push(c);
    }
  }
  return answer;
}
let deletedLeapNodeCnt = fnc(M);

if (parent[M] !== -1 && child[parent[M]].length === 1) deletedLeapNodeCnt--;
console.log(leapNodeCnt - deletedLeapNodeCnt);
