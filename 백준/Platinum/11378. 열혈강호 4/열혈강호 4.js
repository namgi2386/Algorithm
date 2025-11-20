const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

const [N, M, K] = initN;

const canDo = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  const cnt = arr[i][0];
  for (let j = 1; j < cnt + 1; j++) {
    canDo[i].push(arr[i][j]);
  }
}
const taskArr = new Array(M + 1).fill(-1);
function bfs(person, visited) {
  if (visited[person]) return false;
  visited[person] = true;
  for (const task of canDo[person]) {
    if (taskArr[task] === -1 || bfs(taskArr[task], visited)) {
      taskArr[task] = person;
      return true;
    }
  }
  return false;
}
let answer = 0;
for (let i = 0; i < N; i++) {
  const visited = new Array(N).fill(false);
  if (bfs(i, visited)) {
    answer++;
  }
}
function findMore() {
  let answer2 = 0;
  for (let i = 0; i < N; i++) {
    const visited = new Array(N).fill(false);
    if (bfs(i, visited)) {
      answer2++;
    }
  }
  return answer2;
}
let AdditioinTaskSum = 0;
while (true) {
  const temp = findMore();
  if (temp === 0) {
    answer += AdditioinTaskSum;
    break;
  }
  AdditioinTaskSum += temp;
  if (AdditioinTaskSum >= K) {
    answer += K;
    break;
  }
}
console.log(answer);
