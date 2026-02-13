const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M] = inputValue.split(" ").map(Number);

for (let i = 1; i <= Math.max(N, M); i++) {
  if (N % i === 0 && M % i === 0) {
    console.log(`${i} ${Math.floor(N / i)} ${Math.floor(M / i)}`);
  }
}
