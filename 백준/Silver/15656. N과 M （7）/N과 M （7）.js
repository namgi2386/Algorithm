const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
arr.sort((a, b) => a - b);
const [N, M] = initN;

const stack = [];
const answer = [];

function dfs(cnt) {
  if (cnt === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = 0; i < N; i++) {
    stack.push(arr[i]);
    dfs(cnt + 1);
    stack.pop();
  }
}
dfs(0);
console.log(answer.join("\n"));
