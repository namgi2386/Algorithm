const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, candyArr, ...relationArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, M, K] = initN;

let parent = Array.from({ length: N + 1 }, (_, i) => i);
function union(s, e) {
  let ps = find(s);
  let pe = find(e);
  if (ps !== pe) {
    parent[ps] = pe;
  }
}
function find(x) {
  if (parent[x] === x) return x;
  parent[x] = find(parent[x]);
  return parent[x];
}
for (let i = 0; i < M; i++) {
  let [s, e] = relationArr[i];
  union(s, e);
}
let map = new Map();
for (let i = 1; i < N + 1; i++) {
  let pi = find(i);
  if (map.has(pi)) {
    let str = map.get(pi);
    let [children, candies] = str.split(",").map(Number);
    children++;
    candies += candyArr[i - 1];
    let newStr = children + "," + candies;
    map.set(pi, newStr);
  } else {
    let newStr = 1 + "," + candyArr[i - 1];
    map.set(pi, newStr);
  }
}
// console.log(parent);
let answerMap = [...map].map((c) => c[1].split(",").map(Number));
// console.log(answerMap);
let maximumYa = answerMap.reduce((a, b) => a + b[0], 0);
let dp = Array(K).fill(0);

let answer = 0;
for (let i = 0; i < answerMap.length; i++) {
  let [a, b] = answerMap[i];
  for (let j = K - 1; j >= a; j--) {
    dp[j] = Math.max(dp[j], dp[j - a] + b);
    answer = Math.max(dp[j], answer);
  }
}
console.log(answer);
