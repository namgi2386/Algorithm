const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, ...arr] = inputValue.split("\n");
N = Number(N);
const board = arr.map(row => row.split(" ").map(Number));

// 흰칸과 검은칸을 따로 저장
const white = [];
const black = [];

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (board[i][j] === 1) {
            if ((i + j) % 2 === 0) {
                white.push([i, j]);
            } else {
                black.push([i, j]);
            }
        }
    }
}

// 대각선 점유 배열
const diag1 = new Array(2 * N - 1).fill(false);
const diag2 = new Array(2 * N - 1).fill(false);

function dfs(positions, index, count) {
    if (index >= positions.length) {
        return count;
    }
    
    let maxCount = dfs(positions, index + 1, count); // 현재 위치를 선택하지 않는 경우
    
    const [r, c] = positions[index];
    const d1 = r + c;
    const d2 = r - c + N - 1;
    
    // 현재 위치에 비숍을 놓을 수 있는 경우
    if (!diag1[d1] && !diag2[d2]) {
        diag1[d1] = true;
        diag2[d2] = true;
        
        const result = dfs(positions, index + 1, count + 1);
        maxCount = Math.max(maxCount, result);
        
        diag1[d1] = false;
        diag2[d2] = false;
    }
    
    return maxCount;
}

const whiteMax = dfs(white, 0, 0);
const blackMax = dfs(black, 0, 0);
console.log(whiteMax + blackMax);