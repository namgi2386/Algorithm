const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
const map = new Map();
let maximum = 0;
for (let i = 0; i < N; i++) {
  let num = arr[i];
  maximum = Math.max(maximum, num);
  const temp = new Map();
  let dif = 2;
  while (num !== 1) {
    if (num % dif === 0) {
      num /= dif;
      temp.set(dif, (temp.get(dif) || 0) + 1);
      const difCnt = temp.get(dif);
      map.set(dif, Math.max(map.get(dif) || 0, difCnt));
    } else {
      dif++;
    }
  }
}
const answerArr = [...map];
let answer = 1;
for (let i = 0; i < answerArr.length; i++) {
  const [node, cnt] = answerArr[i];
  answer *= node ** cnt;
}

console.log(answer === maximum ? answer * answerArr[0][0] : answer);
