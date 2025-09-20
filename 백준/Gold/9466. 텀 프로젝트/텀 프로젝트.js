const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const T = Number(lines[0]);

for (let tc = 0; tc < T; tc++) {
    const N = Number(lines[2 * tc + 1]);
    const arr = lines[2 * tc + 2].split(' ').map(x => Number(x) - 1);
    
    const visited = Array(N).fill(false);
    const finished = Array(N).fill(false);
    let answer = 0;
    
    function dfs(node, path) {
        if (finished[node]) return;
        if (visited[node]) {
            // 사이클 찾음 - path에서 현재 노드부터 끝까지가 사이클
            const cycleStart = path.indexOf(node);
            answer += path.length - cycleStart;
            return;
        }
        
        visited[node] = true;
        path.push(node);
        dfs(arr[node], path);
        finished[node] = true;
    }
    
    for (let i = 0; i < N; i++) {
        if (!visited[i]) {
            dfs(i, []);
        }
    }
    
    console.log(N - answer);
}