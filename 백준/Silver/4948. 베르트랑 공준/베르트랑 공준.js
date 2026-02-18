const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const MAX = 123456 * 2;
const arr = new Array(MAX + 1).fill(true);
arr[0] = false;
arr[1] = false;
for (let i = 2; i <= MAX; i++) {
  if (!arr[i]) continue;
  let idx = 2;
  while (i * idx <= MAX) {
    arr[i * idx++] = false;
  }
}
let answer = [];
for (const num of inputValue) {
  if (num === 0) continue;
  let cnt = 0;
  for (let i = num + 1; i <= num * 2; i++) {
    if (arr[i]) cnt++;
  }
  answer.push(cnt);
}
console.log(answer.join("\n"));
