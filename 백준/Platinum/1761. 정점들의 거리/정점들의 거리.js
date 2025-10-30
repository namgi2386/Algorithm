const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N); // 40000
let tree = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b, c] = initArr[i];
  tree[a].push([b, c]);
  tree[b].push([a, c]);
}
function preprocessing(tree, N) {
  let parent = new Array(N + 1).fill(0);
  let depth = new Array(N + 1).fill(0);
  let level = new Array(N + 1).fill(0);
  let visited = new Array(N + 1).fill(false);

  let queue = [1];
  visited[1] = true;
  depth[1] = 0;
  level[1] = 0;

  let idx = 0;
  while (idx < queue.length) {
    let cur = queue[idx++];

    for (let [next, dist] of tree[cur]) {
      if (!visited[next]) {
        visited[next] = true;
        parent[next] = cur;
        depth[next] = depth[cur] + dist;
        level[next] = level[cur] + 1;
        queue.push(next);
      }
    }
  }

  return { parent, depth, level };
}

function LCA(a, b, parent, level) {
  while (level[a] > level[b]) a = parent[a];
  while (level[b] > level[a]) b = parent[b];
  while (a !== b) {
    a = parent[a];
    b = parent[b];
  }
  return a;
}
const { parent, depth, level } = preprocessing(tree, N);

const M = Number(initArr[N - 1]); // 10000

function solution() {
  let answer = [];
  for (let i = N; i < N + M; i++) {
    const [a, b] = initArr[i];
    // console.log("parent", parent);
    // console.log("depth", depth);
    // console.log("level", level);

    // console.log("a,b", a, b);
    const lca = LCA(a, b, parent, level);
    // console.log("pa", parent[a], parent[b]);
    // console.log("de", depth[a], depth[b]);

    // console.log("lca", lca);
    // console.log("dist:", depth[a], depth[b], depth[lca]);
    const dist = depth[a] + depth[b] - 2 * depth[lca];
    answer.push(dist);
  }
  console.log(answer.join("\n"));
}
solution();
