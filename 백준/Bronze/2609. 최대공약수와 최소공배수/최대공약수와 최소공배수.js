const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [A, B] = inputValue.split(' ').map(Number);

function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

const GCD = gcd(A, B);
const LCM = (A * B) / GCD;

console.log(GCD);
console.log(LCM);