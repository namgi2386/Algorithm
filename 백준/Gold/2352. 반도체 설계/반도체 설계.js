const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

const lis = [];

for (let i = 0; i < N; i++) {
  const num = arr[i];
  let start = 0;
  let end = lis.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (lis[mid] < num) {
      start = mid + 1;
    } else {
      end = mid;
    }
  }
  if (start === lis.length) {
    lis.push(num);
  } else {
    lis[start] = num;
  }
}
console.log(lis.length);
