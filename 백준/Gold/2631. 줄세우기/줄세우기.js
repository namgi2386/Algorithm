const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, ...arr] = inputValue.split("\n").map(Number);

const lis = [];
for (let i = 0; i < N; i++) {
  const num = arr[i];
  if (lis.length === 0 || lis[lis.length - 1] < num) {
    lis.push(num);
  } else {
    let left = 0;
    let right = lis.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (lis[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    lis[left] = num;
  }
  // console.log(lis);
}
console.log(N - lis.length);
