const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const N = parseInt(lines[0]);
const input = lines[1].replace(/\s/g, ''); // 두 번째 줄이 실제 수식

// 숫자와 연산자 제대로 분리
const numbers = [];
const operators = [];

let num = '';
for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    
    if (ch >= '0' && ch <= '9') {
        num += ch;
    } else if (ch === '+' || ch === '-' || ch === '*') {
        numbers.push(parseInt(num));
        num = '';
        operators.push(ch);
    }
}
numbers.push(parseInt(num)); // 마지막 숫자 추가

const numCount = numbers.length;

// dp[i][j] = i번째 숫자부터 j번째 숫자까지 구간의 최댓값/최솟값
const maxDp = Array.from({length: numCount}, () => Array(numCount).fill(-Infinity));
const minDp = Array.from({length: numCount}, () => Array(numCount).fill(Infinity));

// 초기값: 한 개짜리 구간
for (let i = 0; i < numCount; i++) {
    maxDp[i][i] = numbers[i];
    minDp[i][i] = numbers[i];
}

// 연산 함수
function calculate(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
}

// 구간 길이를 늘려가며 DP
for (let len = 2; len <= numCount; len++) {
    for (let i = 0; i <= numCount - len; i++) {
        const j = i + len - 1;
        
        // k를 기준으로 구간 분할
        for (let k = i; k < j; k++) {
            const op = operators[k]; // k번째 연산자
            
            // 가능한 4가지 조합
            const val1 = calculate(maxDp[i][k], maxDp[k+1][j], op);
            const val2 = calculate(maxDp[i][k], minDp[k+1][j], op);
            const val3 = calculate(minDp[i][k], maxDp[k+1][j], op);
            const val4 = calculate(minDp[i][k], minDp[k+1][j], op);
            
            maxDp[i][j] = Math.max(maxDp[i][j], val1, val2, val3, val4);
            minDp[i][j] = Math.min(minDp[i][j], val1, val2, val3, val4);
        }
    }
}

console.log(maxDp[0][numCount - 1]);