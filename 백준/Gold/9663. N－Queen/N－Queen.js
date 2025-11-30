const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = Number(inputValue);

const cols = new Array(N).fill(false); // 열 체크
const queens = []; // 놓인 퀸의 위치 [row, col]
let answer = 0;

function isPossible(row, col) {
  // 이미 놓인 퀸들과 대각선 체크
  for (let i = 0; i < queens.length; i++) {
    const [pr, pc] = queens[i];
    // 대각선: 행의 차이와 열의 차이가 같으면 대각선
    if (Math.abs(pr - row) === Math.abs(pc - col)) {
      return false;
    }
  }
  return true;
}

function dfs(row) {
  if (row === N) {
    answer++;
    return;
  }
  
  for (let col = 0; col < N; col++) {
    // 열 체크
    if (cols[col]) continue;
    
    // 대각선 체크
    if (!isPossible(row, col)) continue;
    
    // 퀸 놓기
    cols[col] = true;
    queens.push([row, col]);
    
    dfs(row + 1);
    
    // 퀸 빼기
    queens.pop();
    cols[col] = false;
  }
}

dfs(0);
console.log(answer);