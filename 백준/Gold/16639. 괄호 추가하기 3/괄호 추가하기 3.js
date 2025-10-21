const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, initArr] = inputValue.split("\n");
initArr = initArr.split("");
// N = Number(N);
// 3 8 7 9 2
// ((3+8)*7-9)*2
// dp다
// N 은 최대 19
// 숫자는 최대 10개 (N+1)/2 , 연산자는 최대 9개 (N+1)/2 -1
// 최대연산 2^9만큼이내?
// const [numN, opeN] = [Math.floor((N + 1) / 2), Math.floor((N + 1) / 2) - 1];
// const dp = Array.from({ length: 1 << opeN }, () => -Infinity);
let answer = -Infinity;

function oper(arr) {
  if (arr.length === 1) return Number(arr[0]);
  let tempN = arr.length;
  let [tempNumN, tempOpeN] = [
    Math.floor((tempN + 1) / 2),
    Math.floor((tempN + 1) / 2) - 1,
  ];
  let num = Number(arr[0]);
  for (let i = 0; i < tempOpeN; i++) {
    let op = arr[i * 2 + 1];
    let next = Number(arr[i * 2 + 2]);
    if (op === "+") {
      num += next;
    } else if (op === "-") {
      num -= next;
    } else if (op === "*") {
      num *= next;
    }
  }
  return num;
}

function dfs(arr) {
  if (arr.length === 1) return Number(arr[0]);
  answer = Math.max(answer, oper(arr));
  let tempN = arr.length;
  let [tempNumN, tempOpeN] = [
    Math.floor((tempN + 1) / 2),
    Math.floor((tempN + 1) / 2) - 1,
  ];
  for (let i = 0; i < tempOpeN; i++) {
    let op = arr[i * 2 + 1];
    let prev = Number(arr[i * 2]);
    let next = Number(arr[i * 2 + 2]);
    if (op === "+") {
      prev += next;
    } else if (op === "-") {
      prev -= next;
    } else if (op === "*") {
      prev *= next;
    }
    let nextArr = [...arr.slice(0, i * 2), prev];
    if (i * 2 + 3 < N) nextArr = [...nextArr, ...arr.slice(i * 2 + 3)];
    dfs(nextArr);
  }
}
if (initArr.length === 1) {
  console.log(Number(initArr[0]));
} else {
  dfs(initArr, 0);
  console.log(answer);
}
