const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
initArr = initArr.map((c) => c.split(" ").map(Number));

let answer = 0;
let isPassible = true;
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    let a = initArr[i][j];
    let flag = true;
    for (let k = 0; k < N; k++) {
      if (k === j || k === i) continue;

      let b = initArr[i][k];
      let c = initArr[k][j];
      // console.log("in:", a, b, c);
      if (a === b + c) {
        flag = false;
        break;
      } else if (a > b + c) {
        isPassible = false;
        break;
      }
    }
    if (flag) {
      // console.log(i, j, initArr[i][j]);
      answer += initArr[i][j];
    }
  }
}
console.log(isPassible ? answer : -1);
