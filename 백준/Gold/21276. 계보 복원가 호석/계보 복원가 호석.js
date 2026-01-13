const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, personArr, M, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" "));

N = Number(N);
M = Number(M);
let maxchildren = 0;
const childArr = new Map();
const personCheck = new Map();
const childCnt = new Map();
for (let i = 0; i < N; i++) {
  childArr.set(personArr[i], []);
  personCheck.set(personArr[i], false);
}

for (let i = 0; i < M; i++) {
  const [node, parent] = initArr[i];
  const prevChildArr = childArr.get(parent);
  prevChildArr.push(node);
}
for (const node of childArr) {
  const nodeCnt = node[1].length;
  maxchildren = Math.max(maxchildren, nodeCnt);
  if (childCnt.has(nodeCnt)) {
    const temp = childCnt.get(nodeCnt);
    temp.push(node[0]);
  } else {
    childCnt.set(nodeCnt, [node[0]]);
  }
}
// console.log(childArr);

// console.log(childCnt);
let answer = [];
let cnt = 0;

while (cnt <= maxchildren) {
  const patents = childCnt.get(cnt); // 자식이 cnt명인 부모들
  // console.log(cnt, patents);
  if (childCnt.get(cnt) === undefined) {
    cnt++;
    continue;
  }
  if (cnt === 0) {
    for (const parent of patents) {
      answer.push([parent, 0]);
    }
    cnt++;
    continue;
  }
  for (const parent of patents) {
    const children = childArr.get(parent);
    const temp = [];
    for (const child of children) {
      if (personCheck.get(child)) continue;
      personCheck.set(child, true);
      temp.push(child);
    }
    temp.sort();
    answer.push([parent, temp.length, temp.join(" ")]);
  }
  cnt++;
}

answer.sort((a, b) => a[0].localeCompare(b[0]));
let answer2 = [];
for (const last of personCheck) {
  if (!last[1]) {
    answer2.push(last[0]);
  }
}

answer2.sort();
console.log(answer2.length);
console.log(answer2.join(" "));
console.log(answer.map((c) => c.join(" ")).join("\n"));
