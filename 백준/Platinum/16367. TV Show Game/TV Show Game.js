const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" "));
const [N, M] = initN.map(Number);

const graph = Array.from({ length: 2 * N + 1 }, () => []); // R 이후 B

for (let i = 0; i < M; i++) {
  const nums = [];
  for (let j = 0; j < 3; j++) {
    const [num, type] = [
      queries[i][j * 2],
      queries[i][j * 2 + 1] === "R" ? 0 : N,
    ];
    nums.push(Number(num) + type);
  }
  const mNums = nums.map((c) => (c > N ? c - N : c + N));
  graph[mNums[0]].push(nums[1]);
  graph[mNums[0]].push(nums[2]);
  graph[mNums[1]].push(nums[0]);
  graph[mNums[1]].push(nums[2]);
  graph[mNums[2]].push(nums[0]);
  graph[mNums[2]].push(nums[1]);
}
// graph 완성!!!

const visited = new Array(2 * N + 1).fill(0);
const isFinished = new Array(2 * N + 1).fill(false);
const stack = [];
const sccList = new Array(2 * N + 1).fill(0);
let time = 0;
let sccCount = 0;

function dfs(node) {
  visited[node] = ++time;
  stack.push(node);
  let parent = visited[node];
  for (const next of graph[node]) {
    if (visited[next] === 0) {
      parent = Math.min(parent, dfs(next));
    } else {
      if (!isFinished[next]) {
        parent = Math.min(parent, visited[next]);
      }
    }
  }
  if (visited[node] === parent) {
    // console.log("50::", node, visited[node], parent, stack);

    sccCount++;
    while (true) {
      const peek = stack.pop();
      isFinished[peek] = true;
      sccList[peek] = sccCount;
      if (peek === node) break;
    }
  }
  return parent;
}

for (let i = 1; i < 2 * N + 1; i++) {
  if (visited[i] === 0) {
    dfs(i);
  }
}
let isPossible = true;
let answer = [];

for (let i = 1; i <= N; i++) {
  // console.log("74::", i, sccList[i], sccList[i + N]);

  if (sccList[i] === sccList[i + N]) {
    isPossible = false;
    break;
  } else if (sccList[i] > sccList[i + N]) {
    answer.push("B");
  } else {
    answer.push("R");
  }
}
if (isPossible) {
  console.log(answer.join(""));
} else {
  console.log(-1);
}
