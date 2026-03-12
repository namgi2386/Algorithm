const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const [N, K, D] = lines[0].split(" ").map(Number);

const students = [];
let idx = 1;

for (let i = 0; i < N; i++) {
  const [M, abt] = lines[idx++].split(" ").map(Number);
  let alg = 0;
  
  if (M > 0) {
    const algos = lines[idx++].split(" ").map(Number);
    for (let j = 0; j < M; j++) {
      alg |= (1 << (algos[j] - 1));
    }
  } else {
    idx++; // M이 0이어도 빈 줄 존재
  }
  
  students.push({ alg, abt });
}

students.sort((a, b) => a.abt - b.abt);

let ans = 0;
let left = 0;
const cnt = Array(31).fill(0);

for (let right = 0; right < N; right++) {
  for (let i = 0; i < K; i++) {
    if (students[right].alg & (1 << i)) cnt[i]++;
  }
  
  while (students[right].abt - students[left].abt > D) {
    for (let i = 0; i < K; i++) {
      if (students[left].alg & (1 << i)) cnt[i]--;
    }
    left++;
  }
  
  let now = 0;
  const memberCnt = right - left + 1;
  for (let i = 0; i < K; i++) {
    if (cnt[i] > 0 && cnt[i] < memberCnt) now++;
  }
  
  ans = Math.max(ans, now * memberCnt);
}

process.stdout.write(ans.toString());