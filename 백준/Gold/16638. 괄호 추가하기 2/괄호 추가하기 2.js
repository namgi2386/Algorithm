const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, initArr] = inputValue.split("\n");
N = Number(N);
initArr = initArr.split("");
// + - *
// @ # $
let answer = -Infinity;

function innerFnc(arr) {
  let len = arr.length;
  if (len === 1) {
    answer = Math.max(answer, Number(arr[0]));
    return;
  }
  for (let i = len - 1; i >= 0; i--) {
    if (arr[i] === "*" || arr[i] === "$") {
      let [a, b] = [arr[i - 1], arr[i + 1]];
      arr[i - 1] = a * b;
      arr = [...arr.slice(0, i), ...arr.slice(i + 2)];
    }
  }

  let opeLen = Math.floor((len + 1) / 2 - 1);
  let sum = Number(arr[0]);

  for (let i = 0; i < opeLen; i++) {
    let op = arr[i * 2 + 1];

    if (op === "+" || op === "@") sum += Number(arr[i * 2 + 2]);
    if (op === "-" || op === "#") sum -= Number(arr[i * 2 + 2]);
    if (op === "*" || op === "$") sum *= Number(arr[i * 2 + 2]);
  }
  answer = Math.max(answer, sum);
  return;
}

function dfs(arr) {
  let len = arr.length;
  if (len === 1) {
    answer = arr[0];
    return Number(arr[0]);
  }
  let opeLen = Math.floor((len + 1) / 2) - 1;

  for (let i = 0; i < opeLen; i++) {
    let [a, op, b] = [
      Number(arr[i * 2]),
      arr[i * 2 + 1],
      Number(arr[i * 2 + 2]),
    ];
    if (op === "@" || op === "#" || op === "$") continue;

    let sum = 0;
    if (op === "+") sum = a + b;
    if (op === "-") sum = a - b;
    if (op === "*") sum = a * b;
    // console.log("A:", arr);

    let newArr = [...arr.slice(0, i * 2), sum];
    // console.log("B:", newArr);
    if (i > 0) {
      let prevOp = newArr[i * 2 - 1];
      if (prevOp === "+") newArr[i * 2 - 1] = "@";
      if (prevOp === "-") newArr[i * 2 - 1] = "#";
      if (prevOp === "*") newArr[i * 2 - 1] = "$";
    }
    if (i * 2 + 3 < len) {
      let postOp = arr[i * 2 + 3];
      if (postOp === "+") postOp = "@";
      if (postOp === "-") postOp = "#";
      if (postOp === "*") postOp = "$";

      newArr = [...newArr, postOp, ...arr.slice(i * 2 + 4)];
    }
    // console.log("C:", newArr);

    innerFnc([...newArr]);
    dfs(newArr);
  }
}
dfs(initArr);
console.log(answer);
