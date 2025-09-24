const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);

let parent = Array(N).fill(-1);

function find(a) {
  if (parent[a] === -1) return a;
  parent[a] = find(parent[a]);
  return parent[a];
}

function union(a, b) {
  let x = find(a);
  let y = find(b);
  if (x !== y) {
    parent[x] = y;
  }
}

function solution() {
  for (let i = 0; i < M; i++) {
    let [s, e] = initArr[i].split(" ").map(Number);
    if (find(s) !== find(e)) union(s, e);
    else return i + 1;
  }
  return 0;
}
console.log(solution());
