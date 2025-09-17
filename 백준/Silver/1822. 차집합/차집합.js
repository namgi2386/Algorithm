const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initialNums, arr1, arr2] = inputValue.split("\n");
let [N, M] = initialNums.split(" ").map(Number);
arr1 = arr1.split(" ").map(Number);
arr2 = arr2.split(" ").map(Number);
let map = new Map();
arr2.forEach((c) => map.set(c, ""));

let answer = [];
for (let i = 0; i < N; i++) {
  if (!map.has(arr1[i])) answer.push(arr1[i]);
}
console.log(answer.length);
if (answer.length !== 0) {
  console.log(answer.sort((a, b) => a - b).join(" "));
}
