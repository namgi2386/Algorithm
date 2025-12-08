const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const N = Number(lines[0]);
const fruits = lines[1].split(' ').map(Number);

let left = 0;
let answer = 0;
const fruitCount = {}; // 각 과일의 개수
let kindCount = 0; // 현재 과일 종류 수

for (let right = 0; right < N; right++) {
  // 오른쪽 과일 추가
  const rightFruit = fruits[right];
  if (!fruitCount[rightFruit]) {
    fruitCount[rightFruit] = 0;
    kindCount++;
  }
  fruitCount[rightFruit]++;
  
  // 과일 종류가 3개 이상이면 left 이동
  while (kindCount > 2) {
    const leftFruit = fruits[left];
    fruitCount[leftFruit]--;
    
    if (fruitCount[leftFruit] === 0) {
      delete fruitCount[leftFruit];
      kindCount--;
    }
    left++;
  }
  
  // 최대 길이 갱신
  answer = Math.max(answer, right - left + 1);
}

console.log(answer);