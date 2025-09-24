const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let input = [];
rl.on("line", function (line) {
    input.push(line);
}).on("close", function () {
    solution(input);
    process.exit();
});

function solution(input) {
    const [N, M] = input.shift().split(" ").map(Number);
    const nodes = input.map((e) => e.split(" ").map(Number));
    const parents = new Array(N + 1).fill(-1);
    
    function find(x) {
        if (parents[x] < 0) return x;
        parents[x] = find(parents[x]);
        return parents[x];
    }

    function union(x, y) {
        x = find(x);
        y = find(y);
        if (x != y) {
            parents[x] = y;
        }
    }

    const answer = new Array();
    nodes.forEach(([type, x, y]) => {
        if (type === 0) union(x, y);
        else answer.push(find(x) === find(y) ? "YES" : "NO");
    });

    console.log(answer.join("\n"));
}