const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

for (const arr of inputValue) {
  arr.push(0);
  const N = arr[0];
  if (N === 0) continue;
  let answer = 0;
  let stack = [];
  for (let i = 1; i <= N + 1; i++) {
    const node = arr[i];
    if (stack.length === 0) {
      stack.push([node, 1]);
      continue;
    }
    if (stack[stack.length - 1][0] < node) {
      stack.push([node, 1]);
    } else if (stack[stack.length - 1][0] === node) {
      stack[stack.length - 1][1]++;
    } else {
      // 스택 마지막 놈이 더 높음
      let totalCnt = 0;
      while (stack.length > 0) {
        const [peek, cnt] = stack.pop();
        if (peek <= node) {
          stack.push([peek, cnt]);
          break;
        }
        const temp = peek * (cnt + totalCnt);
        if (answer < temp) {
          answer = temp;
        }
        totalCnt += cnt;
      }
      stack.push([node, ++totalCnt]);
    }
    // console.log(i, stack, answer);
  }

  console.log(answer.toString());
}
