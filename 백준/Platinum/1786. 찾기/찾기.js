const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString();
let [T, P] = inputValue.split("\n").map((c) => c.split(""));

// ABCABDABCABF
// [0,0,0,1,2,0,1,2,3,4,5,0]
// j=5 i=11 다름
// j=arr[4]=2 할당
// j=2 i=11 다름
let arr = Array(P.length).fill(0);
let jIdx = 0;
for (let i = 1; i < P.length; i++) {
  while (P[jIdx] !== P[i] && jIdx > 0) {
    jIdx = arr[jIdx - 1];
  }
  if (P[jIdx] === P[i]) arr[i] = ++jIdx;
}

let answerCnt = 0;
let answerIdx = [];

let i = 0;
let j = 0;
while (i < T.length) {
  if (T[i] === P[j]) {
    if (j === P.length - 1) {
      answerCnt++;
      answerIdx.push(i - j + 1);
      i++;
      j = arr[j];
    } else {
      i++;
      j++;
    }
  } else {
    if (j === 0) {
      i++;
    } else {
      j = arr[j - 1];
    }
  }
}
console.log(answerCnt);
if (answerCnt > 0) {
  console.log(answerIdx.join(" "));
}
