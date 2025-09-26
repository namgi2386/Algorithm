const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n");
N = Number(N);
let arr = initArr[0].split(" ").map(Number);
let M = Number(initArr[1]);
let idx = 0;
while (M > 0 && idx < N) {
  let limit = Math.min(N, idx + M + 1);
  let maxN = arr[idx];
  let maxIdx = idx;
  for (let i = idx; i < limit; i++) {
    if (maxN < arr[i]) {
      maxN = arr[i];
      maxIdx = i;
    }
  }
  if (maxIdx !== idx) {
    M -= maxIdx - idx;
    let prevIdx = maxIdx;
    while (prevIdx > idx) {
      [arr[prevIdx], arr[prevIdx - 1]] = [arr[prevIdx - 1], arr[prevIdx]];
      prevIdx--;
    }
  }
  idx++;
}
console.log(arr.join(" "));
