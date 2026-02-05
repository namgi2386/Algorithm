const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, A, B] = inputValue.split(" ").map(Number);
// 당첨 A개 , 꽝 N - A 개
// aCb* (n-a)C(a-b) + aC(b+1)*(n-a)C(a-b-1) + ... aCa
// nCa

function com(a, b) {
  let num = 1;
  for (let i = 0; i < b; i++) {
    num *= a - i;
  }
  for (let i = 1; i <= b; i++) {
    num /= i;
  }
  return num;
}
let answer = 0;
for (let i = B; i <= A; i++) {
  answer += com(A, i) * com(N - A, A - i);
}
console.log(answer / com(N, A));