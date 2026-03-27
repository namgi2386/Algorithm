const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const K = Number(inputValue);

function getPrime() {
  const M = 100000;
  const arr = new Array(M + 1).fill(true);
  arr[0] = false;
  arr[1] = false;
  for (let i = 2; i < Math.floor(M / 2); i++) {
    if (!arr[i]) continue;
    let idx = 2;
    while (i * idx <= M) {
      arr[i * idx] = false;
      idx++;
    }
  }
  const ans = [];
  for (let i = 2; i <= M; i++) {
    if (arr[i]) ans.push(i);
  }
  return ans;
}
const primes = getPrime(); // [2,   3,   5,   7,  11,  13,  17,  19, ...]
const primesLen = primes.length;

function find(start) {
  // start 이하의 제곱 ㄴㄴ수 개수를 구한다.
  let num = start; // start개 전부 가능 상태
  let fullStack = [];
  for (let i = 0; i < primesLen; i++) {
    const prime = primes[i]; // 소수 하나뽑기
    const node = prime ** 2; // 제곱
    if (node > start) break; // 121이 이미 start넘었으면 계산 의미 없음
    num -= Math.floor(start / node); // 제곱수 배수 전부빼기
    const prevFullStackLen = fullStack.length;
    for (let j = 0; j < i; j++) {
      const prev = primes[j]; // 하나씩 확인 (4,9,25 ...)
      const pp = prev ** 2;
      if (node * pp > start) break;
      num += Math.floor(start / (node * pp));
      fullStack.push([node * pp, 2]);
    }
    let j = 0;
    while (j < prevFullStackLen) {
      const [prev, cnt] = fullStack[j++];
      if (j === 1 && node * prev > start) break;
      if (node * prev > start) continue;
      if (cnt === 1) {
        num += Math.floor(start / (node * prev));
        fullStack.push([node * prev, 2]);
      } else {
        num -= Math.floor(start / (node * prev));
        fullStack.push([node * prev, 1]);
      }
    }
  }
  return num;
}

//     9        25            49                121         169
// i   1        2              3                 4            5
//     0      1   2     3     4    5      6  7  8  9      10
//   [4*9] [4*25 9*25] [4*49 9*49 25*49] [4*121 9 25 49]
function binary(left, right) {
  const mid = Math.floor((left + right) / 2);
  const ans = find(mid);

  if (left === right) return mid;
  if (ans < K) {
    return binary(mid + 1, right);
  } else {
    return binary(left, mid);
  }
}
const answer = binary(1, 2 * K);
console.log(answer);
