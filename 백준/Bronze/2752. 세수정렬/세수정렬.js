const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

console.log(
  inputValue
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b)
    .join(" ")
);
