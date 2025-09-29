const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const n = parseInt(lines[0]);

const A = [];
const B = [];
const C = [];
const D = [];

for (let i = 1; i <= n; i++) {
    const [a, b, c, d] = lines[i].split(' ').map(Number);
    A.push(a);
    B.push(b);
    C.push(c);
    D.push(d);
}

// A+B의 모든 합을 Map에 저장 (값: 개수)
const map = new Map();

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        const sum = A[i] + B[j];
        map.set(sum, (map.get(sum) || 0) + 1);
    }
}

// C+D 순회하며 -(C+D)의 개수를 Map에서 찾기
let answer = 0;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        const sum = C[i] + D[j];
        const target = -sum;
        
        if (map.has(target)) {
            answer += map.get(target);
        }
    }
}

console.log(answer);