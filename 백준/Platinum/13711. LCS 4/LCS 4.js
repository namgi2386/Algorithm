const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [n, ...initArr] = inputValue.split("\n").map((c) => c.trim());
n = Number(n);
let [Arr, Brr] = initArr.map((c) => c.split(" ").map(Number));

let map = new Map();
for (let i = 0; i < n; i++) {
  map.set(Arr[i], i);
}
for (let i = 0; i < n; i++) {
  if (map.has(Brr[i])) {
    Brr[i] = map.get(Brr[i]);
  }
}
// Brr = [10, 9, 2, 5, 3, 7, 101, 18, 4, 6]
function binarySearch(arr, num) {
  let [s, e] = [0, arr.length];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (arr[mid] > num) {
      e = mid - 1;
    } else if (arr[mid] < num) {
      s = mid + 1;
    } else {
      return mid;
    }
  }
  return s;
}
let lis = [];
for (c of Brr) {
  let idx = binarySearch(lis, c);
  if (idx === lis.length) {
    lis.push(c);
  } else {
    lis[idx] = c;
  }
}
console.log(lis.length);
