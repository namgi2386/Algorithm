const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, ...arr] = inputValue.split("\n").map(c => c.split(" ").map(Number));
[N, M] = [Number(N), Number(M)];
const [START, END] = arr.pop();

const graph = Array.from({ length: N + 1 }, () => []);
const reversed = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0); // 해당 node로 진입하는 간선의 수 기록
const dist = Array(N + 1).fill(0);

for (let i = 0; i < M; i++) {
  const [a, b, c] = arr[i];
  graph[a].push([b, c]);
  reversed[b].push([a, c]);
  indegree[b]++;
}

// 위상정렬로 최장 경로
const queue = [START];
while (queue.length > 0) {
  const node = queue.shift();
  
  for (let [next, cost] of graph[node]) {
    dist[next] = Math.max(dist[next], dist[node] + cost);
    indegree[next]--;
    if (indegree[next] === 0) queue.push(next);
  }
}

// 역방향 BFS로 임계 간선 카운트
const visited = Array(N + 1).fill(false);
const queue2 = [END];
visited[END] = true;
let edgeCount = 0;

while (queue2.length > 0) {
  const node = queue2.shift();
  
  for (let [prev, cost] of reversed[node]) {
    if (dist[prev] + cost === dist[node]) {
      edgeCount++;
      if (!visited[prev]) {
        visited[prev] = true;
        queue2.push(prev);
      }
    }
  }
}

console.log(dist[END]);
console.log(edgeCount);