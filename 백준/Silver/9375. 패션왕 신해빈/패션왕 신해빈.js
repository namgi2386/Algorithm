const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue.split("\n").map((c) => c.trim());
let idx = 0;

for (let tc = 0; tc < TC; tc++) {
  let map = new Map();
  let N = Number(arr[idx]);
  idx++; // N 읽은 후 바로 증가
  
  for (let i = 0; i < N; i++) {
    let type = arr[idx].split(" ")[1];
    map.set(type, (map.get(type) || 0) + 1);
    idx++; // 각 의상 처리 후 증가
  }
  
  let numArr = [...map.values()].map((c) => c + 1);
  let answer = numArr.reduce((a, b) => a * b, 1) - 1; // 초기값 1 추가
  console.log(answer);
}