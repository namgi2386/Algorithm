const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
for (let i = 0; i < Number(TC); i++) {
  const [a, b] = arr[i];
  let num = 1;
  for (let i = 0; i < b; i++) {
    num *= a;
    num %= 10;
  }
  console.log(num === 0 ? 10 : num);
}
