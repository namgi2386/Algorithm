const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
function fnc(num) {
  let [a, b] = [1, 1];
  let idx = 2;
  while (true) {
    const c = a;
    a = b;
    b = (c + b) % num;
    if (a === b && a === 1) {
      return idx - 1;
    }
    idx++;
  }
}
for (const [t, num] of arr) {
  const ans = fnc(num);
  console.log(`${t} ${ans}`);
}
