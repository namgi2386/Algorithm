const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
const initArr = arr.map((c) => c.split(" ").map(Number));
let maxSumValue = 0;
let maxOneValue = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    maxSumValue += initArr[i][j];
    maxOneValue = Math.max(maxOneValue, initArr[i][j]);
  }
}
function checkMaxSumValue() {
  let num = 2;
  let answer = 0;
  while (true) {
    if (maxSumValue >= num) {
      answer = num;
      num *= 2;
    } else {
      return answer;
    }
  }
}
maxSumValue = checkMaxSumValue();

function deepCopy(arr) {
  return arr.map((ar) => [...ar]);
}

function swipe(type, arr) {
  // type값에 따라 좌우상하 arr 변경시키기
  // 최댓값으로 maxOneValue 업데이트 시키기
  // console.log("swipe동작check", type);

  switch (type) {
    case 0:
      for (let i = 0; i < N; i++) {
        let stack = [];
        let prev = 0;
        for (let j = 0; j < N; j++) {
          if (arr[i][j] !== 0 && stack.length === 0) {
            stack.push(arr[i][j]);
            prev = arr[i][j];
          } else if (arr[i][j] !== 0 && prev !== 0) {
            if (prev === arr[i][j]) {
              stack.pop();
              stack.push(prev * 2);
              prev = 0;
            } else {
              stack.push(arr[i][j]);
              prev = arr[i][j];
            }
          } else if (arr[i][j] !== 0 && prev === 0) {
            stack.push(arr[i][j]);
            prev = arr[i][j];
          }
          // console.log("좌1:", stack, prev);
        }
        // console.log("좌2:", stack, prev);
        let tempStackLength = N - stack.length;
        for (let t = 0; t < tempStackLength; t++) {
          stack.push(0);
        }
        // console.log("좌3:", stack, prev);

        arr[i] = stack;
      }
      break;
    case 1:
      for (let i = 0; i < N; i++) {
        let stack = [];
        let prev = 0;
        for (let j = N - 1; j >= 0; j--) {
          if (arr[i][j] !== 0 && stack.length === 0) {
            stack.push(arr[i][j]);
            prev = arr[i][j];
          } else if (arr[i][j] !== 0 && prev !== 0) {
            if (prev === arr[i][j]) {
              stack.pop();
              stack.push(prev * 2);
              prev = 0;
            } else {
              stack.push(arr[i][j]);
              prev = arr[i][j];
            }
          } else if (arr[i][j] !== 0 && prev === 0) {
            stack.push(arr[i][j]);
            prev = arr[i][j];
          }
        }
        let tempStackLength = N - stack.length;
        for (let t = 0; t < tempStackLength; t++) {
          stack.push(0);
        }
        arr[i] = stack;
      }
      break;
    case 2:
      for (let i = 0; i < N; i++) {
        let stack = [];
        let prev = 0;
        for (let j = 0; j < N; j++) {
          if (arr[j][i] !== 0 && stack.length === 0) {
            stack.push(arr[j][i]);
            prev = arr[j][i];
          } else if (arr[j][i] !== 0 && prev !== 0) {
            if (prev === arr[j][i]) {
              stack.pop();
              stack.push(prev * 2);
              prev = 0;
            } else {
              stack.push(arr[j][i]);
              prev = arr[j][i];
            }
          } else if (arr[j][i] !== 0 && prev === 0) {
            stack.push(arr[j][i]);
            prev = arr[j][i];
          }
        }
        let tempStackLength = N - stack.length;
        for (let t = 0; t < tempStackLength; t++) {
          stack.push(0);
        }
        for (let tt = 0; tt < N; tt++) {
          arr[tt][i] = stack[tt];
        }
      }
      break;
    case 3:
      for (let i = 0; i < N; i++) {
        let stack = [];
        let prev = 0;
        for (let j = N - 1; j >= 0; j--) {
          if (arr[j][i] !== 0 && stack.length === 0) {
            stack.push(arr[j][i]);
            prev = arr[j][i];
          } else if (arr[j][i] !== 0 && prev !== 0) {
            if (prev === arr[j][i]) {
              stack.pop();
              stack.push(prev * 2);
              prev = 0;
            } else {
              stack.push(arr[j][i]);
              prev = arr[j][i];
            }
          } else if (arr[j][i] !== 0 && prev === 0) {
            stack.push(arr[j][i]);
            prev = arr[j][i];
          }
        }
        let tempStackLength = N - stack.length;
        for (let t = 0; t < tempStackLength; t++) {
          stack.push(0);
        }
        for (let tt = 0; tt < N; tt++) {
          arr[tt][i] = stack[tt];
        }
      }
      break;
    default:
      break;
  }
  // console.log("inner:", type, arr);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      maxOneValue = Math.max(maxOneValue, arr[i][j]);
    }
  }
}
let plag = false;
// console.log("가능한 최댓값:", maxSumValue);

function dfs(level, arr) {
  if (level === 5 || maxOneValue === maxSumValue) {
    return;
  }
  if (maxOneValue === maxSumValue) {
    plag = true;
    return;
  }
  for (let s = 0; s < 4; s++) {
    let copiedArr = deepCopy(arr);
    swipe(s, copiedArr);
    // console.log("?", maxOneValue, ...copiedArr);

    dfs(level + 1, copiedArr);
    if (plag) return;
  }
}
dfs(0, initArr);
console.log(maxOneValue);
