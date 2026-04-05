const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, M] = inputValue.split(" ").map(Number);
const stack = [];
const answer = [];
function dfs(prev, cnt) {
  if (cnt === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = prev + 1; i <= N; i++) {
    stack.push(i);
    dfs(i, cnt + 1);
    stack.pop();
  }
}
dfs(0, 0);
console.log(answer.join("\n"));
