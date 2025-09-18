const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

for (let i = 1; i < Number(inputValue) + 1; i++) {
  console.log(i);
}
