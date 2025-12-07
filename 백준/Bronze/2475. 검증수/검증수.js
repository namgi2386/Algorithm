const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let arr = inputValue.split(" ").map(Number);
let answer = 0;
for (const c of arr) {
  answer += c ** 2 % 10;
}
console.log(answer % 10);
