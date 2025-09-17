const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [T, ...arr] = inputValue.split("\n");
let [SN, EN] = T.split(" ").map(Number);
arr = arr.map(Number);

function b() {
  let [s, e] = [0, Math.max(...arr)];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    let sum = 0;
    for (let i = 0; i < SN; i++) {
      sum += Math.floor(arr[i] / mid);
    }
    if (sum < EN) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  return e;
}

console.log(b());
