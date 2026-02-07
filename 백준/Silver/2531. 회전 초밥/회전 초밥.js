const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...arr] = inputValue.split("\n");
let [N, d, k, ticket] = initN.split(" ").map(Number);
arr = arr.map(Number);

if (N === k) {
  let set = new Set();
  arr.map((c) => set.add(c));
  set.add(ticket);
  console.log(set.size);
} else {
  const map = new Map();
  let answer = 0;
  let nowLen = 0;
  for (let i = 0; i < k; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
      answer++;
      nowLen++;
    }
  }
  for (let i = 0; i < N; i++) {
    const delnum = arr[i];
    const newnum = arr[(k + i) % N];
    const delNumCnt = map.get(delnum);
    if (delNumCnt === 1) {
      map.delete(delnum);
      nowLen--;
    } else {
      map.set(delnum, delNumCnt - 1);
    }
    if (map.has(newnum)) {
      map.set(newnum, map.get(newnum) + 1);
    } else {
      map.set(newnum, 1);
      nowLen++;
    }
    if (map.has(ticket)) {
      answer = Math.max(answer, nowLen);
    } else {
      answer = Math.max(answer, nowLen + 1);
    }
  }

  console.log(answer);
}
