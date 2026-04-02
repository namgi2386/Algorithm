const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const [A, B] = inputValue.split(' ');

let sum = 0;
for (let i = 0; i < A.length; i++) {
  for (let j = 0; j < B.length; j++) {
    sum += Number(A[i]) * Number(B[j]);
  }
}

process.stdout.write(sum.toString());