const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let inputArr = inputValue.split("\n");

let orderSize = Number(inputArr[0]);
let [N1, N2] = inputArr[1].split(" ").map(Number);
let arr1 = [];
let arr2 = [];

for (let i = 2; i < inputArr.length; i++) {
  if (arr1.length < N1) {
    arr1.push(Number(inputArr[i]));
  } else {
    arr2.push(Number(inputArr[i]));
  }
}
// console.log(orderSize); // 7
// console.log(N1, N2); // 5 3
// console.log(arr1); // [ 2, 2, 1, 7, 2 ]
// console.log(arr2); // [ 6, 8, 3 ]
// console.log("--");

// 2 초	128 MB
// N 200만
// 각피자 조각수 m,n 최대 1000
// m개줄 피자크기 n개줄 피자크기 (시계방향) 각 피자크기 최대1000
// 한판 최대크기 100만
// 가능한 경우의 수 출력
// 불가능시 0출력

// 경우의수 n1-1 * n1 가능 => 최대 1000이라서 100만가지 경우의 수
// 경우의수 n2-1 * n2 가능 => 최대 1000이라서 100만가지 경우의 수
// 각 피자에서 가능한 경우의 수를 매핑하자
// map1 = [value : cnt]
// map2 = [value : cnt]
// 이후 map1 map2 정렬
// ordersize 이상 제외
// map1순회하며 map2 역순순회하며 합이 ordersize되도록 매칭하며 answer구하기

// 각 피자에서 가능한 경우의 수를 매핑하자
let map1 = new Map();
for (let startIdx = 0; startIdx < N1; startIdx++) {
  let sum = 0;
  for (let piece = 0; piece < N1 - 1; piece++) {
    let idx = Math.floor((startIdx + piece) % N1);
    sum += arr1[idx];
    if (sum > orderSize) break; // ordersize 이상 제외
    map1.set(sum, (map1.get(sum) || 0) + 1);
  }
}
let map2 = new Map();
for (let startIdx = 0; startIdx < N2; startIdx++) {
  let sum = 0;
  for (let piece = 0; piece < N2 - 1; piece++) {
    let idx = Math.floor((startIdx + piece) % N2);
    sum += arr2[idx];
    if (sum > orderSize) break;
    map2.set(sum, (map2.get(sum) || 0) + 1);
  }
}
// console.log(map1);
// console.log(map2);
// 전체집합
let totalSum1 = arr1.reduce((a, b) => a + b, 0);
if (totalSum1 <= orderSize) {
  map1.set(totalSum1, (map1.get(totalSum1) || 0) + 1);
}
let totalSum2 = arr2.reduce((a, b) => a + b, 0);
if (totalSum2 <= orderSize) {
  map2.set(totalSum2, (map2.get(totalSum2) || 0) + 1);
}
// 공집합
map1.set(0, 1);
map2.set(0, 1);

// console.log(map1);
// console.log(map2);
// 이후 map1 map2 정렬
let answer = 0;
for (let i = 0; i <= orderSize; i++) {
  let cnt1 = map1.get(i) || 0;
  let cnt2 = map2.get(orderSize - i) || 0;
  let sum = cnt1 * cnt2;
  answer += sum;
}
console.log(answer);