const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, M] = inputValue.split(" ").map(Number);
// a+0 a+1 a+2 ... a+(len-1) = N
// 0부터 (len-1)까지 합 + a*len = N
// a = (N - sum)/len
let answer = -1;
for (let len = M; len <= 100; len++) {
  const sum = (len * (len - 1)) / 2;
  const num = N - sum;

  if (num < 0) break;
  if (num % len !== 0) continue;

  const a = num / len;
  if (a < 0) continue;

  const result = [];
  for (let i = 0; i < len; i++) {
    result.push(a + i);
  }
  answer = result.join(" ");
  break;
}
console.log(answer === -1 ? -1 : answer);
