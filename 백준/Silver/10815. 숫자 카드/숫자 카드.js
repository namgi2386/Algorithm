const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, initialArr1, M, initialArr2] = inputValue.split("\n");
let arr1 = initialArr1
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let arr2 = initialArr2.split(" ").map(Number);

function binarySearch(target) {
  let [s, e] = [0, arr1.length - 1];
  while (s <= e) {
    let mid = Math.floor((e + s) / 2);
    if (arr1[mid] === target) return 1;
    if (arr1[mid] > target) {
      e = mid - 1;
    } else {
      s = mid + 1;
    }
  }
  return 0;
}

let result = [];
arr2.map((c) => result.push(binarySearch(c)));
console.log(result.join(" "));
