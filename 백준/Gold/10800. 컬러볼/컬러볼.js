const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
// 공의종류(색상수)는 20만
// cost는 최대 2000 (낮다!)
// 1 초	256 MB(2배내)
let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

// 색별로 매핑 후 각 배열 sorting
// 미리 누적합배열로 만들어두면 좋겠구나

// 값 하나씩 순회 하며 검사할건데
// 해당 값의
// 나의 색 외 다른 친구들에 대해
// 나의 cost와 작은 값 중 가장큰값의 index 찾아옴
// 해당 index의 누적합을 더함

// index찾을때는 이분탐색으로 조져

// 이게 전부인듯?
// 유형은, 누적합 이분탐색.

let map = new Map();
for (let i = 0; i < N; i++) {
  const [a, b] = initArr[i];
  if (map.has(a)) {
    map.get(a).push(b);
  } else {
    map.set(a, [b]);
  }
}
// 20만개 mapping
for (const c of map) {
  c[1].sort((a, b) => a - b);
}
// 색상별로 sorting
// 색상이 2000종류 2000log100 = 14,000 쯤

let sumMap = new Map();
for (const [idx, c] of map) {
  let sumArr = [c[0]];
  for (let i = 1; i < c.length; i++) {
    sumArr.push(sumArr[i - 1] + c[i]);
  }
  sumMap.set(idx, sumArr);
}
// push set 20만번

function binarySearch(cost, arr) {
  const Len = arr.length;
  if (Len === 0) return -1;
  let [s, e] = [0, Len - 1];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    if (arr[mid] < cost) s = mid + 1;  // <= 가 아니라 
    else e = mid - 1;
  }
  return e;
}

// let answer = [];
// for (let i = 0; i < N; i++) {
//   let [color, cost] = initArr[i];
//   let tempSum = 0;
//   for (const [idx, cArr] of map) {
//     if (idx === color) continue;
//     const minIdx = binarySearch(cost, cArr);
//     if (minIdx === -1) continue;
//     tempSum += sumMap.get(idx)[minIdx];
//   }
//   answer.push(tempSum);
// }
// 20만개 요소 각각
// 2000개 색상 binarySearch함 100개씩 담고있음 = log100 = 7
// 14,000 * 20만번 (여기내 여기서 timeover인데,)
// 나와 다른 모든색상에 대해 binarySearch를 하지 않고 처리 할 수 있나?
// 애초에 20만번 순회할때 이를 구할 수 있는건가?

// 2000개 값에 대해 배열을 만들어둬야하나?
// 혹시 색상별로?
// 20만 *2000 배열만드라고?
// 배열크기만 4억인데?
// 4000*4000*2
// 안됨

// 20만
// * 500
// console.log(map);
// console.log(sumMap);
let totalCntArr = new Array(2001).fill(0);
for (const [idx, cArr] of map) {
  for (c of cArr) {
    totalCntArr[c] += 1;
  }
}

for (let i = 1; i < 2001; i++) {
  totalCntArr[i] = totalCntArr[i - 1] + totalCntArr[i] * i;
}
// console.log(totalCntArr);
let answer = [];
for (let i = 0; i < N; i++) {
  let [color, cost] = initArr[i];
  let a = map.get(color);
  let idx = binarySearch(cost, a);

  let my = sumMap.get(color)[idx];
  // console.log(cost, a, idx + 1, my, totalCntArr[cost]);
  answer.push(totalCntArr[cost - 1] - (idx >= 0 ? my : 0));
}

console.log(answer.join("\n"));
