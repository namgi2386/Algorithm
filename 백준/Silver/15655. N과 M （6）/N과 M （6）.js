const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const [N, M] = lines[0].split(' ').map(Number);
const numbers = lines[1].split(' ').map(Number).sort((a, b) => a - b);
const result = [];
const answer = [];

function dfs(start, depth) {
    if (depth === M) {
        answer.push(result.join(' '));
        return;
    }
    
    for (let i = start; i < N; i++) {
        result.push(numbers[i]);
        dfs(i + 1, depth + 1);
        result.pop();
    }
}

dfs(0, 0);
console.log(answer.join('\n'));