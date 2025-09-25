const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const steps = inputValue.split(' ').map(Number);
steps.pop(); // 마지막 0 제거

const memo = new Map();

function getCost(from, to) {
    if (from === to) return 1; // 같은 자리
    if (from === 0) return 2; // 중앙에서 다른 곳으로
    if (Math.abs(from - to) === 2) return 4; // 반대편 (1↔3, 2↔4)
    return 3; // 인접한 곳
}

function solve(left, right, idx) {
    // 기저 조건: 모든 스텝을 다 밟음
    if (idx === steps.length) return 0;
    
    // 메모이제이션 체크
    const key = `${left},${right},${idx}`;
    if (memo.has(key)) return memo.get(key);
    
    const nextStep = steps[idx];
    let result = Infinity;
    
    // 왼발로 다음 스텝을 밟는 경우
    if (nextStep !== right) { // 두 발이 같은 자리에 올 수 없음
        result = Math.min(result, solve(nextStep, right, idx + 1) + getCost(left, nextStep));
    }
    
    // 오른발로 다음 스텝을 밟는 경우  
    if (nextStep !== left) { // 두 발이 같은 자리에 올 수 없음
        result = Math.min(result, solve(left, nextStep, idx + 1) + getCost(right, nextStep));
    }
    
    memo.set(key, result);
    return result;
}

console.log(solve(0, 0, 0));