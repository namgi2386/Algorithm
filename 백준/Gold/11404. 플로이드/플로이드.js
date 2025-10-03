const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [n, m, ...initArr] = inputValue.split("\n").map((c) => c.trim());
n = Number(n);
m = Number(m);
initArr = initArr.map((c) => c.split(" ").map(Number));

// 최단거리 dp 만들기
const dist = Array.from({ length: n + 1 }, () =>
  new Array(n + 1).fill(Infinity)
);
// 대각선 0 초기화
for (let i = 1; i < n + 1; i++) {
  dist[i][i] = 0;
}
// 간선 초기화
for (let i = 0; i < m; i++) {
  const [s, e, w] = initArr[i];
  dist[s][e] = Math.min(dist[s][e], w);
}
for (let k = 1; k < n + 1; k++) {
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
    }
  }
}

console.log(
  dist
    .slice(1)
    .map((c) =>
      c
        .slice(1)
        .map((d) => (d === Infinity ? 0 : d))
        .join(" ")
    )
    .join("\n")
);
