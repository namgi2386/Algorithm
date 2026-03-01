const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const N = Number(inputValue);
for (let i = 1; i < 10; i++) {
  console.log(`${N} * ${i} = ${N * i}`);
}
