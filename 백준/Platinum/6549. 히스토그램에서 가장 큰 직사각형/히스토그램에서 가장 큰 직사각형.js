const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim().split(" ").map(BigInt));

for (const arr of inputValue) {
  const N = arr[0];
  if (N === 0n) continue;
  let answer = 0n;
  let stack = [];
  for (let i = 1; i <= N; i++) {
    const node = arr[i];
    if (stack.length === 0) {
      stack.push([node, 1n]);
      continue;
    }
    if (stack[stack.length - 1][0] < node) {
      stack.push([node, 1n]);
    } else if (stack[stack.length - 1][0] === node) {
      stack[stack.length - 1][1] += 1n;
    } else {
      // 스택 마지막 놈이 더 높음
      let totalCnt = 0n;
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
      stack.push([node, totalCnt + 1n]);
    }
    // console.log(i, stack, answer);
  }
  // 1 2 4 5 6 7 6 6 2

  let totalCnt = 0n;
  for (let i = stack.length - 1; i >= 0; i--) {
    const temp = stack[i][0] * (totalCnt + stack[i][1]);
    if (answer < temp) {
      answer = temp;
    }
    totalCnt += stack[i][1];
  }

  console.log(answer.toString());
}
