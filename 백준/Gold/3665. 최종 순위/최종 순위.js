const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
TC = Number(TC);
let tcIdx = 0;
let answer = [];
for (let tc = 0; tc < TC; tc++) {
  const N = Number(initArr[tcIdx]);
  const arr = initArr[tcIdx + 1];
  const M = initArr[tcIdx + 2][0];

  const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
  const health = Array(N + 1).fill(0);

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      graph[arr[i]][arr[j]] = true;
      health[arr[j]]++;
    }
  }
  for (let i = 0; i < M; i++) {
    const [a, b] = initArr[tcIdx + 3 + i];
    if (graph[a][b]) {
      graph[a][b] = false;
      graph[b][a] = true;
      health[a]++;
      health[b]--;
    } else {
      graph[b][a] = false;
      graph[a][b] = true;
      health[a]--;
      health[b]++;
    }
  }
  const queue = [];
  const result = [];
  for (let i = 1; i <= N; i++) {
    if (health[i] === 0) queue.push(i);
  }
  let isQuestion = false;

  while (queue.length > 0) {
    if (queue.length > 1) {
      isQuestion = true;
      break;
    }
    const node = queue.shift()
    result.push(node)
    for(let next = 1 ; next <=N;next++){
      if(graph[node][next]){
        health[next]--
        if(health[next] === 0) queue.push(next)
      }
    }
  }
  if(isQuestion){
    answer.push("?")
  } else if(result.length !== N){
    answer.push("IMPOSSIBLE")
  } else {
    answer.push(result.join(" "));
  }
  tcIdx += M + 3;
}
console.log(answer.join("\n"));
