const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
// 2500칸
// 4200 가지 경우의수
let [initN, ...board] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M, G, R] = initN;

let keys = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const node = board[i][j];
    if (node === 2) {
      keys.push([i, j]);
      board[i][j] = 1;
    }
  }
}
const K = keys.length;
// K <= 10
// K 개 중 G개 선택 + R개 선택하는 경우의 수를
// 1120 1102 1210 1012 1201 1021 2110 0112 2101 0121 2011 0211
const gArr = [];
const myMap = Array.from({ length: 1 << (K + 1) }, () => []);
function getG(prev, stack, cnt) {
  for (let i = prev + 1; i < K; i++) {
    stack += 1 << i;
    cnt++;
    if (cnt === G) {
      gArr.push(stack);
      stack -= 1 << i;
      cnt--;
      continue;
    }
    getG(i, stack, cnt);
    stack -= 1 << i;
    cnt--;
  }
}
//
function getR(prev, gNum, stack, cnt) {
  for (let i = prev + 1; i < K; i++) {
    if ((gNum & (1 << i)) !== 0) continue;
    stack += 1 << i;
    cnt++;
    if (cnt === R) {
      myMap[gNum].push(stack);
      stack -= 1 << i;
      cnt--;
      continue;
    }
    getR(i, gNum, stack, cnt);
    stack -= 1 << i;
    cnt--;
  }
}
getG(-1, 0, 0);
for (const gNum of gArr) {
  getR(-1, gNum, 0, 0);
}
// console.log("in:", keys);
// console.log("in:", gArr.length);
// console.log("in:", gArr[0], myMap[gArr[0]]);

const dr = [1, -1, 0, 0];
const dc = [0, 0, 1, -1];
function isValid(a, b) {
  return 0 <= a && a < N && 0 <= b && b < M && board[a][b] !== 0;
}
function dfs(gNum, rNum, visited) {
  const gStack = [];
  const rStack = [];
  const gNextStack = [];
  const rNextStack = [];
  let idx = true;
  let blossom = 0;
  for (let i = 0; i < K; i++) {
    if (gNum & (1 << i)) {
      gStack.push(keys[i]);
      visited[keys[i][0]][keys[i][1]] = 1;
    }
    if (rNum & (1 << i)) {
      rStack.push(keys[i]);
      visited[keys[i][0]][keys[i][1]] = 1;
    }
  }

  // 순회해보자
  let timer = 1;
  while (true) {
    // if (gNum === 193 && rNum === 40) {
    //   console.log(
    //     "init:",
    //     idx ? "t" : "f",
    //     blossom,
    //     gStack,
    //     rStack,
    //     gNextStack,
    //     rNextStack,
    //   );
    // }
    timer++;
    if (idx) {
      // 기본
      while (gStack.length > 0) {
        const [pr, pc] = gStack.pop();
        if (visited[pr][pc] === Infinity) continue;
        for (let d = 0; d < 4; d++) {
          const [nr, nc] = [pr + dr[d], pc + dc[d]];
          if (!isValid(nr, nc)) continue; // 물
          if (visited[nr][nc] !== 0) continue; // 방문함
          visited[nr][nc] = timer; // 방문체크
          gNextStack.push([nr, nc]); // 다음에 넘겨
        }
      }
      while (rStack.length > 0) {
        const [pr, pc] = rStack.pop();
        for (let d = 0; d < 4; d++) {
          const [nr, nc] = [pr + dr[d], pc + dc[d]];
          if (!isValid(nr, nc)) continue; // 물

          if (visited[nr][nc] === timer) {
            blossom++;
            visited[nr][nc] = Infinity;
            continue;
          } else if (visited[nr][nc] === 0) {
            visited[nr][nc] = timer - 1;
            rNextStack.push([nr, nc]);
          }
        }
      }
      // if (gNum === 193 && rNum === 40) {
      //   console.log("in1:", gNextStack, rNextStack);
      // }
      if (gNextStack.length === 0 || rNextStack.length === 0) break;
      idx = false;
    } else {
      // next
      while (gNextStack.length > 0) {
        const [pr, pc] = gNextStack.pop();
        if (visited[pr][pc] === Infinity) continue;
        for (let d = 0; d < 4; d++) {
          const [nr, nc] = [pr + dr[d], pc + dc[d]];
          if (!isValid(nr, nc)) continue; // 물
          if (visited[nr][nc]) continue; // 방문함
          visited[nr][nc] = timer; // 방문체크
          gStack.push([nr, nc]); // 다음에 넘겨
        }
      }
      while (rNextStack.length > 0) {
        const [pr, pc] = rNextStack.pop();
        for (let d = 0; d < 4; d++) {
          const [nr, nc] = [pr + dr[d], pc + dc[d]];
          if (!isValid(nr, nc)) continue; // 물
          if (visited[nr][nc] === timer) {
            // if (gNum === 193 && rNum === 40) {
            //   console.log("?????:", nr, nc, timer);
            // }
            blossom++;
            visited[nr][nc] = Infinity;
            continue;
          } else if (visited[nr][nc] === 0) {
            visited[nr][nc] = timer - 1;
            rStack.push([nr, nc]);
          }
        }
      }
      // if (gNum === 193 && rNum === 40) {
      //   console.log("in2:", gStack, rStack);
      // }
      if (gStack.length === 0 || rStack.length === 0) break;
      idx = true;
    }
  }
  return blossom;
}
let answer = 0;
for (let gNum of gArr) {
  for (let rNum of myMap[gNum]) {
    // 하나씩 해보자
    const visited = Array.from({ length: N }, () => new Array(M).fill(0));
    const flowerCnt = dfs(gNum, rNum, visited);
    // if (flowerCnt === 6) {
    //   console.log("6?:", gNum, rNum);
    // }
    answer = Math.max(answer, flowerCnt);
  }
}
console.log(answer);
