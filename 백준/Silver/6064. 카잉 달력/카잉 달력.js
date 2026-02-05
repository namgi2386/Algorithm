const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
arr = arr.map((c) => c.split(" ").map(Number));
for (const [a, b, c, d] of arr) {
  const set = new Set();
  let idx = 0;
  let answer = -1;
  while (true) {
    const num = (a * idx + c - d) % b;
    if (num === 0) {
      answer = a * idx + c;
      break;
    } else {
      if (set.has(num)) {
        break;
      } else {
        set.add(num);
      }
    }
    idx++;
  }
  console.log(answer);
}
