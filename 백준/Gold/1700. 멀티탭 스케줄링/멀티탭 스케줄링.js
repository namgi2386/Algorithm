const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
let [N, K] = initN;

let set = new Set();
let answer = 0;
for (let i = 0; i < K; i++) {
  const now = arr[i];
  if (set.has(now)) continue;
  if (set.size < N) {
    set.add(now);
    continue;
  }
  let target = -1;
  let maxDist = -1;
  for (const num of set) {
    let next = Infinity;
    for (let j = i + 1; j < K; j++) {
      if (arr[j] === num) {
        next = j;
        break;
      }
    }
    if (next > maxDist) {
      maxDist = next;
      target = num;
    }
  }
  set.delete(target);
  set.add(now);
  answer++;
}
console.log(answer);
