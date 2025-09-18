const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, M] = inputValue.split(" ").map(Number);

const stack = [];
const answer = [];
function dfs(level, start) {
  if (level === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = start; i < N + 1; i++) {
    stack.push(i);
    dfs(level + 1, i + 1);
    stack.pop();
  }
}
dfs(0, 1);
console.log(answer.join("\n"));
