const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initialNums, arr] = inputValue.split("\n");
let [N, Target] = initialNums.split(" ").map(Number);
arr = arr.split(" ").map(Number);
// console.log(arr);

function bin() {
  let [s, e] = [0, Math.max(...arr)];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    let sum = 0;
    for (let i = 0; i < N; i++) {
      if (arr[i] - mid > 0) {
        sum += arr[i] - mid;
      }
    }
    if (sum === Target) {
      return mid;
    } else if (sum < Target) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  return e;
}
console.log(bin());
