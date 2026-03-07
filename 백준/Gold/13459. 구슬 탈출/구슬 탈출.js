const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n");
const [N, M] = initN.split(" ").map(Number);
arr = arr.map((c) => c.trim().split(""));
let [prr, prc, pbr, pbc, hr, hc] = [0, 0, 0, 0, 0, 0];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const node = arr[i][j];
    if (node === "R") {
      [prr, prc] = [i, j];
      arr[i][j] = ".";
    } else if (node === "B") {
      [pbr, pbc] = [i, j];
      arr[i][j] = ".";
    } else if (node === "O") {
      [hr, hc] = [i, j];
    }
  }
}
function isValid(r, c) {
  return 0 < r && r < N - 1 && 0 < c && c < M - 1;
}
function run1(r, c, wdr, wdc) {
  let i = 1;
  let [ar, ac] = [r, c];
  while (true) {
    const nr = r + wdr * i;
    const nc = c + wdc * i;
    if (!isValid(nr, nc)) break;
    const node = arr[nr][nc];
    if (node === "O") {
      return [-2, -2];
    } else if (node === "#") {
      break;
    } else if (node === ".") {
      i++;
      [ar, ac] = [nr, nc];
    }
  }
  return [ar, ac];
}
function run2(r, c, wdr, wdc, pr, pc) {
  let i = 1;
  let [ar, ac] = [r, c];
  while (true) {
    const nr = r + wdr * i;
    const nc = c + wdc * i;
    if (!isValid(nr, nc)) break;
    if (nr === pr && nc === pc) break;
    const node = arr[nr][nc];
    if (node === "O") {
      return [-2, -2];
    } else if (node === "#") {
      break;
    } else if (node === ".") {
      i++;
      [ar, ac] = [nr, nc];
    }
  }

  return [ar, ac];
}
const dr = [0, 0, 1, -1];
const dc = [1, -1, 0, 0]; // 오른쪽 , 왼쪽 , 아래로, 위로

const visited = new Map();
visited.set(`${prr},${prc},${pbr},${pbc}`, 0);

const stack = [];
stack.push([prr, prc, pbr, pbc, 0]);
let answer = false;
while (stack.length > 0) {
  const [rr, rc, br, bc, cnt] = stack.pop();
  // console.log("?", rr, rc, br, bc, cnt);
  if (cnt === 10) continue;

  for (let d = 0; d < 4; d++) {
    const [wdr, wdc] = [dr[d], dc[d]];
    if (d === 0) {
      // 오른쪽
      if (rc < bc) {
        // 파란공이 더 오른쪽
        const [nbr, nbc] = run1(br, bc, wdr, wdc);
        if (nbr === -2) continue; // 파란공빠짐
        const [nrr, nrc] = run2(rr, rc, wdr, wdc, nbr, nbc);
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }

        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      } else {
        // 빨간공이 더 오른쪽
        const [nrr, nrc] = run1(rr, rc, wdr, wdc);
        const [nbr, nbc] = run2(br, bc, wdr, wdc, nrr, nrc);
        if (nbr === -2) continue; // 파란공빠짐
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      }
    } else if (d === 1) {
      // 왼쪽
      if (rc > bc) {
        // 파란공이 더 왼쪽
        const [nbr, nbc] = run1(br, bc, wdr, wdc);
        if (nbr === -2) continue; // 파란공빠짐
        const [nrr, nrc] = run2(rr, rc, wdr, wdc, nbr, nbc);
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      } else {
        // 빨간공이 더 왼쪽
        const [nrr, nrc] = run1(rr, rc, wdr, wdc);
        const [nbr, nbc] = run2(br, bc, wdr, wdc, nrr, nrc);

        if (nbr === -2) continue; // 파란공빠짐
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      }
    } else if (d === 2) {
      // 아래
      if (rr < br) {
        // 파란공이 더 아래있음
        const [nbr, nbc] = run1(br, bc, wdr, wdc);
        if (nbr === -2) continue; // 파란공빠짐
        const [nrr, nrc] = run2(rr, rc, wdr, wdc, nbr, nbc);
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      } else {
        // 빨간공이 더 아래있음
        const [nrr, nrc] = run1(rr, rc, wdr, wdc);
        const [nbr, nbc] = run2(br, bc, wdr, wdc, nrr, nrc);
        if (nbr === -2) continue; // 파란공빠짐
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      }
    } else if (d === 3) {
      // 위
      if (rr > br) {
        // 파란공이 더 위
        const [nbr, nbc] = run1(br, bc, wdr, wdc);
        if (nbr === -2) continue; // 파란공빠짐
        const [nrr, nrc] = run2(rr, rc, wdr, wdc, nbr, nbc);
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      } else {
        // 빨간공이 더 위
        const [nrr, nrc] = run1(rr, rc, wdr, wdc);
        const [nbr, nbc] = run2(br, bc, wdr, wdc, nrr, nrc);
        if (nbr === -2) continue; // 파란공빠짐
        if (nrr === -2) {
          // 빨간공빠짐
          answer = true;
          break;
        }
        if (visited.get(`${nrr},${nrc},${nbr},${nbc}`) <= cnt + 1) {
          continue;
        }
        visited.set(`${nrr},${nrc},${nbr},${nbc}`, cnt + 1);
        if (cnt < 10) {
          stack.push([nrr, nrc, nbr, nbc, cnt + 1]);
        }
      }
    }
  }
  if (answer) break;
}
console.log(answer ? 1 : 0);
