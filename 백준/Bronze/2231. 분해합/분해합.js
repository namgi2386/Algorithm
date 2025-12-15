const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = Number(inputValue);
let answer = 0;
for (let i = N; i >= 0; i--) {
  const M = N - i;
  let a = M;
  let e = 0;
  while (M >= 10 ** e) {
    const t = 10 ** e;
    a += Math.floor(M / t) % 10;
    if (a > N) break;
    e++;
  }
  // console.log(N, M, a);

  if (a === N) {
    answer = M;
    break;
  }
}
console.log(answer);
