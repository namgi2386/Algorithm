const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const initN = Number(inputValue);

const count = Array(10).fill(0);
let num = initN;
let point = 1;
while (num !== 0) {
  // 2345
  // 앞자리 끝자리
  // 234, 5
  const [prev, post] = [Math.floor(num / 10), num % 10];

  // 0-4: 235*1회
  // 0-3: 24*10회
  // 0-2: 3*100회
  for (let i = 0; i < post; i++) {
    count[i] += (prev + 1) * point;
  }

  // 5: 234 * 1 + 1회
  // 4: 23 * 10 + 6회
  // 3: 2 * 100 + 46회
  // 2: 2*0 + 346회
  count[post] += prev * point + ((initN % point) + 1);

  // (post+1) ~ 9까지: prev * point회
  // 6-9: 234*1회
  // 5-9: 23*10회
  // 4-9: 2*100회
  for (let i = post + 1; i < 10; i++) {
    count[i] += prev * point;
  }
  num = prev;
  point *= 10;
}

// 0 처리
/*
1 - 9
= 1-9=1회

10 - 19 1=10회 + 각1회
20 - 29 2=10회 + 각1회
90 - 99 9=10회 + 각1회
= 1-9=10회 + 각9회

100 - 109 10=10회(1=10,0=10) + 각1회 
110 - 119 11=10회(1=10,1=10) + 각1회
190 - 199 19=10회(1=10,9=10) + 각1회 => 1=100 각10회 각10회
990 - 999 99=10회 + 각1회

=> 1-9=100회 각=90회 각90회

만약999라면, 
1-9:111회 각90*2 + 9회

1000 - 1009 100=10회 + 각1회
1010 - 1019 101=10회 + 각1회
9990 - 9999 999=10회 + 각1회

=> 1-9=1000회 각900회 각900회 + 각900회
만약 9999라면
1-9:1111회 각900*3 + 90*2 + 9*1회 맞내?
*/
let zeros = 0;
let temp = 1;
while (temp <= initN) {
  zeros += temp;
  temp *= 10;
}
count[0] -= zeros;

console.log(count.join(" "));
