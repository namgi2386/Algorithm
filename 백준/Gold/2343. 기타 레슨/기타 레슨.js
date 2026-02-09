const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [N, M] = initN;

const SUM = arr.reduce((a, b) => a + b);
let [left, right] = [Math.max(...arr), SUM];
let answer = -1;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  let sum = 0;
  let idx = 0;
  let cnt = 0;
  while (cnt < M) {
    while (idx < N && sum + arr[idx] <= mid) {
      sum += arr[idx++];
    }
    // console.log("mid=", mid, "sum=", sum, "idx=", idx);
    if (sum === 0) break;
    cnt++;
    sum = 0;
  }
  // console.log(left, right, mid, cnt, idx);
  if (idx === N) {
    // 다 담음
    right = mid - 1;
    answer = mid;
  } else if (idx < N && cnt === M) {
    // 다 못담았는데, box는 다 채움
    left = mid + 1;
  }
}
console.log(answer);
