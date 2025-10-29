const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [N, M] = initN;

const dist = Array.from({length: N+1}, () => Array(N+1).fill(Infinity));
for(let i = 1; i <= N; i++) dist[i][i] = 0;

const edges = [];
for(let i = 0; i < M; i++) {
  const [a, b, c] = initArr[i];
  edges.push([a, b, c]);
  dist[a][b] = Math.min(dist[a][b], c);
  dist[b][a] = Math.min(dist[b][a], c);
}

for(let k = 1; k <= N; k++)
  for(let i = 1; i <= N; i++)
    for(let j = 1; j <= N; j++)
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

let answer = Infinity;
for(let start = 1; start <= N; start++) {
  let maxTime = 0;
  for(let [a, b, c] of edges) {
    const da = dist[start][a];
    const db = dist[start][b];
    const time = Math.max(da, db) + (c - Math.abs(da - db)) / 2;
    maxTime = Math.max(maxTime, time);
  }
  answer = Math.min(answer, maxTime);
}

console.log(answer.toFixed(1));