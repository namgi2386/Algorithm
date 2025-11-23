const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const initArr = inputValue.split("\n").map((c) => c.trim());
const TC = Number(initArr[0]);
let idx = 1;
let answer = [];
for (let tc = 0; tc < TC; tc++) {
  let isReversed = false;
  const COMMENDS = initArr[idx].split("");
  const N = Number(initArr[idx + 1]);
  let arr = initArr[idx + 2]
    .slice(1)
    .split(",")
    .map((c, i) => parseInt(c));
  if (N === 0) {
    arr = [];
  }
  let isError = false;
  for (let i = 0; i < COMMENDS.length; i++) {
    const commend = COMMENDS[i];
    if (commend === "R") {
      isReversed = !isReversed;
    } else {
      if (arr.length === 0) {
        answer.push("error");
        isError = true;
        break;
      }
      if (!isReversed) {
        arr.shift();
      } else {
        arr.pop();
      }
    }
  }
  if (!isError) {
    if (isReversed) {
      arr.reverse();
    }
    answer.push(`[${arr.join(",")}]`);
  }
  idx += 3;
}
console.log(answer.join('\n'));
