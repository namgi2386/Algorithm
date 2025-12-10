const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, arr] = inputValue.split("\n");
N = Number(N);
M = Number(M);
arr = arr.split("");
let idx = 0;
let len = 0;
let answer = 0;
while (idx < M) {
  // console.log("idx", idx);
  if (arr[idx] === "I" && idx + 1 < M && arr[idx + 1] === "O") {
    len++;
    // console.log("len:", len, "ar", idx + 2, arr[idx + 2]);
    if (len === N && idx + 2 < M && arr[idx + 2] === "I") {
      answer++;
      len--;
    }
    idx += 2;
  } else {
    idx++;
    len = 0;
  }
  // console.log("next idx :", idx, answer);
}
console.log(answer);
