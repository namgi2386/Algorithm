const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const arr = inputValue.split("");
const stack = [];
for (let i = 0; i < arr.length; i++) {
  const node = arr[i];
  if (node === ")") {
    let next = stack.pop();
    let cnt = 0;
    while (next !== "(") {
      if (next[0] === "+") {
        cnt += Number(next);
      } else {
        cnt++;
      }
      next = stack.pop();
    }
    const num = stack.pop();
    stack.push(`+${Number(num) * cnt}`);
  } else {
    stack.push(node);
  }
}
let answer = 0;
stack.map((c) => {
  if (c[0] === "+") {
    answer += Number(c);
  } else {
    answer++;
  }
});
console.log(answer);
