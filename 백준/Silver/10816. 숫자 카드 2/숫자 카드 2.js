const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr1, M, arr2] = inputValue.split("\n");
[arr1, arr2] = [arr1, arr2].map((arr) => arr.split(" ").map(Number));

let map = new Map();
arr1.forEach((c) => {
  map.set(c, (map.get(c) || 0) + 1);
});
let answer = [];
arr2.forEach((c) => {
  answer.push(map.get(c) || 0);
});
console.log(answer.join(" "));
