const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, M] = inputValue.split(" ").map(Number);

const arr = new Array(N + 1).fill(false);
let answer = [];
let idx = 0;
while (answer.length < N) {
  let cnt = 0;
  while (cnt < M) {
    const num = arr[idx];

    if (!num) {
      if (cnt === M - 1) {
        arr[idx] = true;
        answer.push(idx + 1);
        break;
      }
      cnt++;
    }
    idx = (idx + 1) % N;
  }
}
console.log("<".concat(answer.join(", ")).concat(">"));
