const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim().split(""));
let answer = 0;
for (let i = 0; i < 8; i++) {
  const arr = inputValue[i];
  for (let j = 0; j < 8; j++) {
    const node = arr[j];
    if ((i + j) % 2 === 0 && node === "F") answer++;
  }
}
console.log(answer);
