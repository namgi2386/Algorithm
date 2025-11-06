const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let initArr = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
// 상태: 번호순 16마리 각각 생존여부, x, y, d 를 갖는다. 총 64크기
// 3^15가지의 상태가 존재가능하다. 1400만
let initialBoard = Array.from({ length: 16 }, () => [true, -1, -1, 0]); // 생존여부, x, y, d
let positionMap = new Map();
let initialShark = [0, 0, initArr[0][1] - 1, initArr[0][0]]; // x,y,d,cost
initialBoard[initArr[0][0] - 1][0] = false;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    if (i === 0 && j === 0) continue;
    const idx = initArr[i][j * 2] - 1; // 0-indexed
    const direction = initArr[i][j * 2 + 1] - 1; // 0-indexed
    initialBoard[idx] = [true, i, j, direction];
    positionMap.set(`${i},${j}`, idx);
  }
}

const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, -1, -1, -1, 0, 1, 1, 1];
function nextFish(pr, pc, d, sr, sc) {
  for (let i = 0; i < 8; i++) {
    const [nr, nc] = [pr + dr[(d + i) % 8], pc + dc[(d + i) % 8]];
    if (nr < 0 || nr >= 4 || nc < 0 || nc >= 4) continue;
    if (nr === sr && nc === sc) continue;
    return [nr, nc, (d + i) % 8];
  }
  return [null, null, null];
}
// 물고기 initial move
for (let i = 0; i < 16; i++) {
  const [alive, pr, pc, pd] = initialBoard[i];

  if (!alive) continue; // 뒤짐
  const [nr, nc, nd] = nextFish(pr, pc, pd, 0, 0);

  if (nr === null) continue; // 못움직임
  const nIdx = positionMap.get(`${nr},${nc}`);
  if (nIdx === undefined) {
    // 빈칸
    initialBoard[i] = [true, nr, nc, nd];
  } else {
    // 자리바꿈
    initialBoard[nIdx] = [true, pr, pc, initialBoard[nIdx][3]];
    initialBoard[i] = [true, nr, nc, nd];
    positionMap.set(`${nr},${nc}`, i);
    positionMap.set(`${pr},${pc}`, nIdx);
  }
}
// console.log(initialBoard);
// console.log(positionMap);

let answer = 0;
function dfs(shark, board, map) {
  const [sr, sc, sd, cost] = shark;
  // 상어가 갈수있는 위치 계산
  const nextArr = [];
  for (let i = 1; i < 4; i++) {
    const tr = sr + dr[sd] * i;
    const tc = sc + dc[sd] * i;
    if (map.has(`${tr},${tc}`)) {
      const tIdx = map.get(`${tr},${tc}`);
      nextArr.push([tr, tc, tIdx, board[tIdx][3]]);
    }
  }
  // [이동할r , 이동할c , 거기있는놈 idx, 그놈 방향]
  if (nextArr.length === 0) {
    // console.log(answer, cost);

    answer = Math.max(answer, cost);
    return;
  }
  for (const [nr, nc, nIdx, nd] of nextArr) {
    const nextBoard = [];
    const nextMap = new Map([...map]);
    for (let i = 0; i < 16; i++) {
      nextBoard.push([...board[i]]);
    }
    // 상어 이동
    nextBoard[nIdx][0] = false;
    nextMap.delete(`${nr},${nc}`);
    // 물고기 이동
    for (let i = 0; i < 16; i++) {
      const [alive, fpr, fpc, fpd] = nextBoard[i];

      if (!alive) continue; // 뒤짐
      const [fnr, fnc, fnd] = nextFish(fpr, fpc, fpd, nr, nc);

      if (fnr === null) continue; // 못움직임
      const fnIdx = nextMap.get(`${fnr},${fnc}`);
      if (fnIdx === undefined) {
        // 빈칸
        nextBoard[i] = [true, fnr, fnc, fnd];
        nextMap.set(`${fnr},${fnc}`, i);
        nextMap.delete(`${fpr},${fpc}`);
      } else {
        // 자리바꿈
        nextBoard[fnIdx] = [true, fpr, fpc, nextBoard[fnIdx][3]];
        nextBoard[i] = [true, fnr, fnc, fnd];
        nextMap.set(`${fnr},${fnc}`, i);
        nextMap.set(`${fpr},${fpc}`, fnIdx);
      }
    }
    dfs([nr, nc, nd, cost + nIdx + 1], nextBoard, nextMap);
  }
}

dfs(initialShark, initialBoard, positionMap); // [x,y,d,cost] , [[생존여부, x, y, d],[],...]
// console.log("--");

console.log(answer);
