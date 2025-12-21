const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const arr = inputValue.split("\n").map(Number);
const set = new Set();
for (let i = 0; i < arr.length; i++) {
  set.add(arr[i] % 42);
}
console.log(set.size);
