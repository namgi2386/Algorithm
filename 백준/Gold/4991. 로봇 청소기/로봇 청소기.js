const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim());

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

function isValid(r, c, col, row) {
  return 0 <= r && r < row && 0 <= c && c < col;
}

function bfs(sr, sc, board, col, row) {
  const visited = Array.from({ length: row }, () => new Array(col).fill(-1));
  visited[sr][sc] = 0;
  const queue = [[sr, sc]];
  let front = 0;
  
  while (front < queue.length) {
    const [pr, pc] = queue[front++];
    
    for (let d = 0; d < 4; d++) {
      const nr = pr + dr[d];
      const nc = pc + dc[d];
      if (!isValid(nr, nc, col, row)) continue;
      if (visited[nr][nc] !== -1) continue;
      if (board[nr][nc] === 'x') continue;
      
      visited[nr][nc] = visited[pr][pc] + 1;
      queue.push([nr, nc]);
    }
  }
  return visited;
}

let idx = 0;
while (idx < inputValue.length) {
  const [col, row] = inputValue[idx++].split(" ").map(Number);
  if (col === 0 && row === 0) break;
  
  const board = [];
  let start = null;
  const tasks = [];
  
  for (let i = 0; i < row; i++) {
    const line = inputValue[idx++].split("");
    board.push(line);
    for (let j = 0; j < col; j++) {
      if (line[j] === "o") start = [i, j];
      else if (line[j] === "*") tasks.push([i, j]);
    }
  }
  
  const n = tasks.length;
  const points = [start, ...tasks];
  const dist = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));
  
  // 모든 지점 간 최단거리 계산
  let impossible = false;
  for (let i = 0; i < n + 1; i++) {
    const [r, c] = points[i];
    const visited = bfs(r, c, board, col, row);
    
    for (let j = 0; j < n + 1; j++) {
      if (i === j) {
        dist[i][j] = 0;
        continue;
      }
      const [tr, tc] = points[j];
      dist[i][j] = visited[tr][tc];
      if (dist[i][j] === -1) {
        impossible = true;
        break;
      }
    }
    if (impossible) break;
  }
  
  if (impossible) {
    console.log(-1);
    continue;
  }
  
  // DP[mask][cur] = mask 상태에서 cur 위치에 있을 때 최소 거리
  const dp = Array.from({ length: 1 << n }, () => new Array(n + 1).fill(Infinity));
  dp[0][0] = 0; // 시작점(0번)에서 출발
  
  for (let mask = 0; mask < (1 << n); mask++) {
    for (let cur = 0; cur < n + 1; cur++) {
      if (dp[mask][cur] === Infinity) continue;
      
      for (let next = 0; next < n; next++) {
        if (mask & (1 << next)) continue; // 이미 방문한 먼지
        
        const nextMask = mask | (1 << next);
        const nextPos = next + 1; // tasks 인덱스는 1부터 시작
        dp[nextMask][nextPos] = Math.min(
          dp[nextMask][nextPos],
          dp[mask][cur] + dist[cur][nextPos]
        );
      }
    }
  }
  
  const fullMask = (1 << n) - 1;
  let answer = Infinity;
  for (let i = 1; i <= n; i++) {
    answer = Math.min(answer, dp[fullMask][i]);
  }
  
  console.log(answer === Infinity ? -1 : answer);
}