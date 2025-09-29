const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let arr = inputValue.split("-");
let answer = arr[0]
  .split("+")
  .map(Number)
  .reduce((a, b) => a + b, 0);

for (let i = 1; i < arr.length; i++) {
  answer -= arr[i]
    .split("+")
    .map(Number)
    .reduce((a, b) => a + b, 0);
}
console.log(answer);
