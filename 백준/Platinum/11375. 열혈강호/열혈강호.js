const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

const [N, M] = initN;
const canDo = Array.from({ length: N }, () => []);

for (let i = 0; i < N; i++) {
  const cnt = arr[i][0];
  for (let j = 1; j < cnt + 1; j++) {
    canDo[i].push(arr[i][j]);
  }
}
const taskArr = Array(M + 1).fill(-1);
function dfs(person, visited) {
  for (const task of canDo[person]) {
    if (visited[task]) continue;
    visited[task] = true;
    if (taskArr[task] === -1 || dfs(taskArr[task], visited)) {
      taskArr[task] = person;
      return true;
    }
  }
  return false;
}
let answer = 0;
for (let i = 0; i < N; i++) {
  const visited = Array(M + 1).fill(false);
  if (dfs(i, visited)) {
    answer++;
  }
}
console.log(answer);
