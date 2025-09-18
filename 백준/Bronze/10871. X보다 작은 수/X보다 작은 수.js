const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [a, arr] = inputValue.split("\n");
let [N, X] = a.trim().split(" ").map(Number);
arr = arr.split(" ").map(Number);
let li = [];
for (let i = 0; i < N; i++) {
  if (arr[i] < X) {
    li.push(arr[i]);
  }
}
console.log(li.join(" "));
