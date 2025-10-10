const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr1, arr2] = inputValue.split("\n").map((c) =>
  c
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b)
);
N = Number(N);
let [arr11, arr22] = [arr1, arr2].map((ar) =>
  ar.map((c, i) => {
    let temp = ar[(i + 1) % N] - c;
    return temp >= 0 ? temp : 360000 + temp;
  })
);
// console.log(arr1);
// console.log(arr2);
// console.log("--");
// N = 9;
// arr11 = ["a", "b", "c", "d", "c", "d", "a", "b", "c"];
// arr22 = ["c", "d", "a", "b", "c", "a", "b", "c", "d"];
// console.log(arr11.join(" "));
// console.log(arr22.join(" "));
// console.log("--");
// //

let kmp = Array(N).fill(0);

let jIdx = 0;
for (let i = 1; i < N; i++) {
  while (arr22[i] !== arr22[jIdx] && jIdx > 0) {
    jIdx = kmp[jIdx - 1];
  }
  if (arr22[i] === arr22[jIdx]) kmp[i] = ++jIdx;
}
// console.log("kmp:", kmp.join(" "));
arr11 = [...arr11, ...arr11];
let i = 0;
let j = 0;
let answer = "impossible";
while (i < 2 * N) {
  // console.log("in:",i, j, arr11[i], arr22[j]);

  if (arr11[i] === arr22[j]) {
    i++;
    j++;
    if (j === N) {
      answer = "possible";
      break;
    }
  } else {
    if (j > 0) {
      j = kmp[j - 1];
    } else {
      i++;
    }
  }
}
console.log(answer);
