const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

N = Number(N);

function fnc(a, b) {
  if (a < b) {
    [a, b] = [b, a];
  }
  while (true) {
    const c = a % b;
    if (c === 0) {
      return b;
    }
    a = b;
    b = c;
  }
}
const dp = new Array(N).fill(1);
const graph = Array.from({ length: N }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b, initP, initQ] = initArr[i];
  const initGcd = fnc(initP, initQ);
  const [p, q] = [Math.floor(initP / initGcd), Math.floor(initQ / initGcd)];
  graph[a].push([b, p, q]);
  graph[b].push([a, q, p]);
}
const visitedStack = [];
const visited = new Set();
const callStack = [0];
let initialCommit = false;
function dfs() {
  while (callStack.length > 0) {
    const node = callStack.shift();

    for (let [next, p, q] of graph[node]) {
      if (visited.has(`${node},${next}`) || visited.has(`${next},${node}`))
        continue;
      // console.log("init", node, next);
      callStack.push(next);
      visited.add(`${node},${next}`);
      visited.add(`${next},${node}`);
      visitedStack.push([node, next]);
      let prev = node;
      let now = next;
      // console.log("--", prev, now);

      if (dp[node] === 1 && dp[next] !== 1) {
        [prev, now] = [now, prev];
        [p, q] = [q, p];
      }
      if (dp[prev] === 1 && dp[now] === 1 && !initialCommit) {
        dp[prev] = p;
        dp[now] = q;
        initialCommit = true;
        continue;
      }
      const gcd = fnc(dp[prev], p);
      // console.log("?>>>", prev, now, p, q, ":", dp, gcd);
      const num = Math.floor(p / gcd);
      dp[prev] *= num;
      dp[now] = Math.floor(dp[prev] / p) * q;
      // console.log("?", prev, now, p, q, ":", dp, gcd);
      const temp = new Set();
      temp.add(prev);
      temp.add(now);
      for (let i = visitedStack.length - 2; i >= 0; i--) {
        const [ba, bb] = visitedStack[i];

        if (!temp.has(bb)) {
          dp[bb] *= num;
          start = bb;
          temp.add(bb);
        } else if (!temp.has(ba)) {
          dp[ba] *= num;
          start = ba;
          temp.add(ba);
        }
      }
      // console.log("@", dp);
    }
  }
}
dfs();
console.log(dp.join(" "));
