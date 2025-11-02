const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [a, b, c] = inputValue.split(" ").map(Number);
let answer = 0;
if (a === b && b === c) {
  answer = 10000 + 1000 * a;
} else if (a === b || a === c) {
  answer = 1000 + 100 * a;
} else if (b === c) {
  answer = 1000 + 100 * b;
} else {
  answer = Math.max(a, b, c) * 100;
}
console.log(answer);
