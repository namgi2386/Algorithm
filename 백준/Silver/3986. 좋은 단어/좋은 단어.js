const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let answer = 0;
for (let tc = 0; tc < Number(N); tc++) {
  let stack = [];
  let arr = initArr[tc].trim().split("");
  let pointer = -1;
  // console.log("start", arr);
  for (let i = 0; i < arr.length; i++) {
    if (stack.length === 0) {
      stack.push(arr[i]);
      pointer++;
    } else {
      // console.log("?", pointer, stack[pointer], arr[i]);

      if (stack[pointer] === arr[i]) {
        stack.pop();
        pointer--;
      } else {
        stack.push(arr[i]);
        pointer++;
      }
    }
    // console.log(stack);
  }
  if (stack.length === 0) answer++;
}
console.log(answer);
