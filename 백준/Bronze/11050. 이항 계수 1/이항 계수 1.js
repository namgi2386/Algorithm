const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [a, b] = inputValue.split(" ").map(Number);
let answer = 1;
for (let i = 0; i < b; i++) {
  answer *= a - i;
}

for (let i = b; i > 1; i--) {
  answer /= i;
}
console.log(answer);
