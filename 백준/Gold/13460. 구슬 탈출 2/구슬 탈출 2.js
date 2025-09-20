const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initNums, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initNums.split(" ").map(Number);
let board = initArr.map((c) => c.split(""));
// console.log("시작", board);

let [initR, initB, O] = Array(3);
for (let i = 1; i < N - 1; i++) {
  for (let j = 1; j < M - 1; j++) {
    if (board[i][j] === "R") initR = [i, j];
    else if (board[i][j] === "B") initB = [i, j];
    else if (board[i][j] === "O") O = [i, j];
  }
}

//11:40

// 상하우좌
const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];

function move(r, c, d) {
  let cnt = 0;
  while (board[r + dr[d]][c + dc[d]] !== "#") {
    r += dr[d];
    c += dc[d];
    cnt++;
    if (board[r][c] === "O") {
      // let tempdir = d === 0 ? "^" : d === 1 ? "v" : d === 2 ? ">" : "<";
      // console.log("빠지기전: [", r - dr[d], ",", c - dc[d], "]", tempdir);

      return [r, c, cnt];
    }
  }
  return [r, c, cnt];
}

function dfs() {
  let queue = [[initR[0], initR[1], initB[0], initB[1], 0]];
  let visited = new Set([`${initR[0]},${initR[1]},${initB[0]},${initB[1]}`]);

  while (queue.length > 0) {
    const [rr, rc, br, bc, level] = queue.shift();

    // console.log("while시작: [", rr, ",", rc, "],[", br, ",", bc, "] :", level);
    if (level >= 10) break;
    for (let d = 0; d < 4; d++) {
      let [nrr, nrc, rcnt] = move(rr, rc, d);
      let [nbr, nbc, bcnt] = move(br, bc, d);

      if (nbr === O[0] && nbc === O[1]) continue;
      if (nrr === O[0] && nrc === O[1]) {
        console.log(level + 1);
        return;
      }
      if (nrr === nbr && nrc === nbc) {
        if (rcnt > bcnt) {
          nrr -= dr[d];
          nrc -= dc[d];
        } else {
          nbr -= dr[d];
          nbc -= dc[d];
        }
      }
      const state = `${nrr},${nrc},${nbr},${nbc}`;
      // console.log("while끝:", nrr, nrc, nbr, nbc, level);
      if (!visited.has(state)) {
        visited.add(state);
        queue.push([nrr, nrc, nbr, nbc, level + 1]);
      }
    }
  }
  console.log(-1);
}
dfs();
