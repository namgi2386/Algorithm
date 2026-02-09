const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n");
const [N, M] = initN.split(" ").map(Number);
board = board.map((c) => c.trim().split(""));

const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0];

let [sr, sc, er, ec] = [-1, -1, -1, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "S") {
      [sr, sc] = [i, j];
    } else if (board[i][j] === "F") {
      [er, ec] = [i, j];
    } else if (board[i][j] === "g") {
      for (let d = 0; d < 4; d++) {
        const nr = i + dr[d];
        const nc = j + dc[d];
        if (!isValid(nr, nc)) continue;
        if (board[nr][nc] === ".") {
          board[nr][nc] = "l";
        }
      }
    }
  }
}

// console.log("board:\n", board);

const visited = Array.from({ length: N }, () =>
  new Array(M).fill([626, 626]),
);
visited[sr][sc] = [0, 0];

function isValid(r, c) {
  return 0 <= r && r < N && 0 <= c && c < M;
}

const stack = [];
stack.push([sr, sc, 0, 0]);

while (stack.length > 0) {
  const [pr, pc, cnt, leap] = stack.pop();

  for (let d = 0; d < 4; d++) {
    const nr = pr + dr[d];
    const nc = pc + dc[d];
    if (!isValid(nr, nc)) continue;
    const [nextCnt, nextLeap] = visited[nr][nc];
    const type = board[nr][nc];
    let [nowCnt, nowLeap] = [cnt, leap];
    if (type === "g") {
      nowCnt++;
    } else if (type === "l") {
      nowLeap++;
    }
    // if (
    //   pr === 5 &&
    //   pc === 2 &&
    //   cnt === 0 &&
    //   leap === 1 &&
    //   nr === 5 &&
    //   nc === 1
    // ) {
    //   console.log("?", visited[nr][nc], nowCnt, nextCnt, nowLeap, nextLeap);
    // }
    if (nowCnt > nextCnt || (nowCnt === nextCnt && nowLeap >= nextLeap))
      continue;
    stack.push([nr, nc, nowCnt, nowLeap]);
    visited[nr][nc] = [nowCnt, nowLeap];
  }
}
// console.log("visited:", visited);

console.log(visited[er][ec].join(" "));
