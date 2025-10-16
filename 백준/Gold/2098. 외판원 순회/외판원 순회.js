const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...board] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
board = board.map((c) => c.split(" ").map(Number));
// (2 ≤ N ≤ 16)
// 요소 최대 100만
// 0 이면 갈 수 없는 간선

// 2 >(10)> 4 >(9)> 3 >(6)> 1 >(10)> 2
//     10       19     25       35

// 첫시작위치 (어디든 무관하지만, 편의를 위해 0부터)
const START = 0;

// row = 현재위치
// column = visited 비트마스킹 체크
// 그때의 최소비용을 dp할 예정이다.
const dp = Array.from({ length: N }, () => new Array(1 << N).fill(-1));

//bitRoad : 비트마스킹 visited 체크
function dfs(now, visited) {
  // 1<<4 === 10000 => 1<<4 -1 === 1111
  // N개 체크된상태 === 전부다 방문함
  // 그때에 첫시작위치인 START로 돌아오는게 가능한지 체크
  if (visited === (1 << N) - 1) {
    return board[now][START] !== 0 ? board[now][START] : Infinity;
  }
  // now에 도착했을때 방문한적 있다면 dp return
  if (dp[now][visited] !== -1) {
    return dp[now][visited];
  }
  // 현재위치 infinity?
  dp[now][visited] = Infinity;
  // 이제 갈 위치
  for (let next = 0; next < N; next++) {
    // 0이면 갈 수 없음
    // bitRoad에서 해당 위치 이미 갔었는지 체크
    if (board[now][next] === 0 || visited & (1 << next)) continue;
    // 다음위치 비트마스킹 추가
    const nextVisted = visited | (1 << next);
    // 다음위치 dfs결과 + 갈 위치 비용
    const cost = dfs(next, nextVisted) + board[now][next];
    // dp 초기화
    dp[now][visited] = Math.min(dp[now][visited], cost);
  }
  return dp[now][visited];
}
// 0번부터 시작하며, 하나만visited해둔 상태로 시작하기
// 외판원 순회는 사이클이기 때문에 시작위치가 무관하다. 어짜피 시작위치로 돌아올것이며,
// 우리는 최단 사이클을 구하는게 목표이다.
let answer = dfs(START, 1);
console.log(answer);
