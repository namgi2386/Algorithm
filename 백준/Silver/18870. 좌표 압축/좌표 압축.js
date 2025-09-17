const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr1] = inputValue.split("\n");
arr1 = arr1.split(" ").map(Number);
// let [N, arr1, M, arr2] = inputValue.split("\n");
// [arr1, arr2] = [arr1, arr2].map((arr) => arr.split(" ").map(Number));

let set1 = [...new Set(arr1)].sort((a, b) => a - b);
function binarySearch(target) {
  let [s, e] = [0, set1.length - 1];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (set1[mid] === target) return mid;
    else if (set1[mid] < target) s = mid + 1;
    else e = mid - 1;
  }
  return null;
}
let answer = [];
arr1.forEach((c) => answer.push(binarySearch(c)));
console.log(answer.join(" "));
