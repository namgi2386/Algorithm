const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n");
let answer = [];
for (let i = 0; i < Number(N); i++) {
  console.log(`${i + 1}. ${arr[i]}`);
}
