const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const N = +lines[0];
const nums = lines.slice(1, N + 1);
const K = +lines[N + 1];

function charToNum(c) {
  if (c >= '0' && c <= '9') return c.charCodeAt(0) - 48;
  return c.charCodeAt(0) - 55;
}

function numToChar(n) {
  if (n < 10) return String.fromCharCode(n + 48);
  return String.fromCharCode(n + 55);
}

// 각 문자를 Z로 바꿨을 때의 증가량 (BigInt)
const gain = Array(36).fill(0n);

for (let str of nums) {
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let char = str[i];
    let num = charToNum(char);
    let power = len - 1 - i;
    // (Z - 현재문자) × 36^power
    gain[num] += BigInt(35 - num) * (36n ** BigInt(power));
  }
}

// 증가량 큰 순으로 정렬
const sorted = gain.map((v, i) => [i, v]).sort((a, b) => {
  if (a[1] > b[1]) return -1;
  if (a[1] < b[1]) return 1;
  return 0;
});

// K개 선택
const selected = new Set();
for (let i = 0; i < K; i++) {
  selected.add(sorted[i][0]);
}

// 최종 합 계산
let sum = 0n;
for (let str of nums) {
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let char = str[i];
    let num = charToNum(char);
    let power = len - 1 - i;
    
    if (selected.has(num)) {
      sum += 35n * (36n ** BigInt(power));
    } else {
      sum += BigInt(num) * (36n ** BigInt(power));
    }
  }
}

// BigInt를 36진수로 변환
if (sum === 0n) {
  console.log("0");
} else {
  let answer = "";
  while (sum > 0n) {
    answer = numToChar(Number(sum % 36n)) + answer;
    sum = sum / 36n;
  }
  console.log(answer);
}