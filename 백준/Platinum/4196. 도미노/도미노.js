const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let idx = 0;
for (let t = 0; t < Number(TC); t++) {
  const [N, M] = arr[idx++];
  const parent = new Array(N + 1).fill(0);
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < M; i++) {
    const [a, b] = arr[idx++];
    parent[b] = 1;
    graph[a].push(b);
  }
  let answer = 0;
  const stack = [];
  for (let i = 1; i <= N; i++) {
    if (parent[i] === 0) {
      answer++;
      stack.push(i);
    }
  }
  for (const start of stack) {
    let head = 0;
    const stack2 = [start];
    while (head < stack2.length) {
      const node = stack2[head++];
      for (const next of graph[node]) {
        if (parent[next] === 1) {
          stack2.push(next);
          parent[next] = 0;
        }
      }
    }
  }
  // console.log(parent);
  // console.log(graph);
  let circleNum = 2;
  const createdCircleNum = new Set();
  for (let i = 1; i <= N; i++) {
    if (parent[i] === 1) {
      answer++;
      createdCircleNum.add(circleNum);
      // 처리하지 않은 순환 노드 있음
      let head = 0;
      const stack2 = [i];
      parent[i] = circleNum;
      while (head < stack2.length) {
        const node = stack2[head++];
        for (const next of graph[node]) {
          // console.log(
          //   "??",
          //   node,
          //   next,
          //   parent[next],
          //   circleNum,
          //   answer,
          //   createdCircleNum,
          // );

          if (parent[next] === 1) {
            // 손댄적 없는 순환노드
            stack2.push(next);
            parent[next] = circleNum;
          } else if (
            parent[next] !== circleNum &&
            parent[next] > 1 &&
            createdCircleNum.has(parent[next])
          ) {
            // 이미 처리한 순환노드를 또 방문함 (즉, 이전순환노드처리에 중복)
            // console.log("?");

            // stack2.push(next);
            answer--;
            createdCircleNum.delete(parent[next]);
            parent[next] = circleNum;
          }
        }
      }
      circleNum++;
      // console.log("???:", answer);
    }
  }
  console.log(answer);
}
