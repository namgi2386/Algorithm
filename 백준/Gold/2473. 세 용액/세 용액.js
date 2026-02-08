const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

N = Number(N);
arr = arr.sort((a, b) => a - b);
const [first, end] = [arr[0], arr[N - 1]];
let answer = []; // 정답배열
if (end < 0) {
  answer = [arr[N - 3], arr[N - 2], arr[N - 1]];
} else if (first > 0) {
  answer = [arr[0], arr[1], arr[2]];
} else {
  let minNum = Infinity;
  for (let i = 0; i < N; i++) {
    let left = i + 1;
    let right = N - 1;
    while (left < right) {
      const sum = arr[i] + arr[left] + arr[right];
      if (Math.abs(sum) < minNum) {
        minNum = Math.abs(sum);
        answer = [arr[i], arr[left], arr[right]];
      }
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else if (sum === 0) {
        break;
      }
    }
  }
}
console.log(answer.sort((a, b) => a - b).join(" "));
