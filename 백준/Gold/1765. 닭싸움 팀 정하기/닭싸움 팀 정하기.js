const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
M = Number(M);

// 조상찾기 = unioon find

let parent = Array.from({ length: N + 1 }, (_, i) => i);
let enamy = Array.from({ length: N + 1 }, () => new Set());

function union(a, b) {
  let pa = find(a);
  let ba = find(b);
  if (pa !== ba) parent[pa] = ba;
}
function find(x) {
  if (parent[x] === x) return parent[x];
  let px = find(parent[x]);
  parent[x] = px;
  return parent[x];
}

for (let i = 0; i < M; i++) {
  let [type, a, b] = initArr[i].split(" ");
  a = Number(a);
  b = Number(b);
  if (type === "F") {
    union(a, b);
  } else {
    if (enamy[a].size > 0) {
      let enamyListA = [...enamy[a]];
      for (let e = 0; e < enamyListA.length; e++) {
        union(enamyListA[e], b);
      }
    }
    if (enamy[b].size > 0) {
      let enamyListB = [...enamy[b]];
      for (let e = 0; e < enamyListB.length; e++) {
        union(enamyListB[e], a);
      }
    }
    enamy[a].add(b);
    enamy[b].add(a);
  }
}
let set = new Set();
for (let i = 1; i < N + 1; i++) {
  set.add(find(i));
}
console.log(set.size);
