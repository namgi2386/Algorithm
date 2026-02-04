const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [n, ...lines] = inputValue.split("\n");
const answers = [];

for (let i = 0; i < Number(n); i++) {
  const [x, y] = lines[i].trim().split(" ").map(Number);
  answers.push(x >= y ? "MMM BRAINS" : "NO BRAINS");
}

console.log(answers.join("\n"));