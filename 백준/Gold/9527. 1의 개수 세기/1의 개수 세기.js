const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const [A, B] = inputValue.split(' ').map(BigInt);

// DP 테이블: d[i] = 0부터 2^i - 1까지의 1의 개수 합
const d = new Array(55);
d[0] = 1n;
for (let i = 1; i < 55; i++) {
    d[i] = d[i - 1] * 2n + (1n << BigInt(i));
}

function go(x) {
    let ans = x & 1n; // 마지막 비트
    
    for (let i = 54; i > 0; i--) {
        if (x & (1n << BigInt(i))) {
            // 현재 비트가 1이면
            ans += d[i - 1] + (x - (1n << BigInt(i)) + 1n);
            x -= 1n << BigInt(i); // 해당 비트 제거
        }
    }
    
    return ans;
}

console.log((go(B) - go(A - 1n)).toString());