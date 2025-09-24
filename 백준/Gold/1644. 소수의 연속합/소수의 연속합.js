const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let N = Number(inputValue);

function primeMaker(n) {
  let arr = new Array(n + 1).fill(true);
  arr[0] = false;
  arr[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (arr[i]) {
      for (let j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }
  let answer = [];
  arr.forEach((c, i) => {
    if (c) answer.push(i);
  });
  return answer;
}

function fnc() {
  let primes = primeMaker(N);
  // console.log(primes.length);
  let [s, e] = [0, 0];
  let answer = 0;
  let sum = 0;
  while (s <= e && e < N && s < N) {
    if (sum === N) {
      answer++;
      if (s === N - 1) break;
      sum -= primes[s++];
    } else if (sum < N) {
      sum += primes[e++];
    } else {
      sum -= primes[s++];
    }
  }
  return answer;
}

if (N === 1) console.log(0);
else if (N === 2) console.log(1);
else {
  console.log(fnc());
}
