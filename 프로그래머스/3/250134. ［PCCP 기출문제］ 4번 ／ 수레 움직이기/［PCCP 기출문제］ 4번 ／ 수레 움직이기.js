function solution(maze) {
  let answer = 17;
  let [N, M] = [maze.length, maze[0].length];
  let [iRr, iRc, iBr, iBc] = [0, 0, 0, 0]; // 시작점
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (maze[i][j] === 1) {
        [iRr, iRc] = [i, j];
      } else if (maze[i][j] === 2) {
        [iBr, iBc] = [i, j];
      }
    }
  }
  const rVisited = Array.from({ length: N }, () => new Array(M).fill(false));
  const bVisited = Array.from({ length: N }, () => new Array(M).fill(false));
  rVisited[iRr][iRc] = true;
  bVisited[iBr][iBc] = true;
  function isValid(r, c) {
    return 0 <= r && r < N && 0 <= c && c < M && maze[r][c] !== 5;
  }
  const directionR = [0, -1, 1, 0];
  const directionC = [1, 0, 0, -1];
  function dfs(prr, prc, pbr, pbc, isRedDone, isBlueDone, time) {
    // console.log(prr, prc, pbr, pbc, isRedDone, isBlueDone, time);

    if (isRedDone && isBlueDone) {
      answer = Math.min(answer, time);
      return;
    }
    if (isRedDone) {
      for (let db = 0; db < 4; db++) {
        let [nbr, nbc] = [pbr + directionR[db], pbc + directionC[db]];
        if (!isValid(nbr, nbc)) continue; //벽컷
        if (bVisited[nbr][nbc]) continue; // visited 컷
        if (prr === nbr && prc === nbc) continue; // 동일 위치 컷
        bVisited[nbr][nbc] = true;
        if (maze[nbr][nbc] === 4) {
          dfs(prr, prc, nbr, nbc, true, true, time + 1);
        } else {
          dfs(prr, prc, nbr, nbc, true, false, time + 1);
        }
        bVisited[nbr][nbc] = false;
      }
    } else if (isBlueDone) {
      for (let dr = 0; dr < 4; dr++) {
        let [nrr, nrc] = [prr + directionR[dr], prc + directionC[dr]];
        if (!isValid(nrr, nrc)) continue; // 벽컷
        if (rVisited[nrr][nrc]) continue; // visited 컷
        if (pbr === nrr && pbc === nrc) continue; // 동일 위치 컷
        rVisited[nrr][nrc] = true;
        if (maze[nrr][nrc] === 3) {
          dfs(nrr, nrc, pbr, pbc, true, true, time + 1);
        } else {
          dfs(nrr, nrc, pbr, pbc, false, true, time + 1);
        }
        rVisited[nrr][nrc] = false;
      }
    } else {
      for (let dr = 0; dr < 4; dr++) {
        let [isRedDoneNow, isBlueDoneNow] = [false, false];
        let [nrr, nrc] = [prr + directionR[dr], prc + directionC[dr]];
        if (!isValid(nrr, nrc)) continue; // 벽컷
        if (rVisited[nrr][nrc]) continue; // visited 컷
        if (maze[nrr][nrc] === 3) isRedDoneNow = true;
        for (let db = 0; db < 4; db++) {
          let [nbr, nbc] = [pbr + directionR[db], pbc + directionC[db]];
          if (!isValid(nbr, nbc)) continue; //벽컷
          if (bVisited[nbr][nbc]) continue; // visited 컷
          if (nrr === pbr && nrc === pbc && nbr === prr && nbc === prc)
            continue; // 자리교체 컷
          if (nrr === nbr && nrc === nbc) continue; // 동일 위치 컷
          if (maze[nbr][nbc] === 4) isBlueDoneNow = true;
          rVisited[nrr][nrc] = true;
          bVisited[nbr][nbc] = true;
          dfs(nrr, nrc, nbr, nbc, isRedDoneNow, isBlueDoneNow, time + 1);
          rVisited[nrr][nrc] = false;
          bVisited[nbr][nbc] = false;
        }
      }
    }
  }
  dfs(iRr, iRc, iBr, iBc, false, false, 0);
  // console.log(rVisited);
  // console.log(bVisited);

  return answer === 17 ? 0 : answer;
}

//

// const input = [
//   [1, 5],
//   [2, 5],
//   [4, 5],
//   [3, 5],
// ];
// console.log(solution(input));

// 명제1: 둘 중 하나는 최단거리로 도착해야만 한다.
// 빨간색 먼저 최단거리로 이동시 자리별 rtime 기록
// 동일위치: 파란색이 빨간색 rtime과 동일한 순간에 해당 위치로 갈 수 없다.
// 자리교체: 파란색 현재위치의 btime이 rtime+1이며, 이동하려는 위치의 rtime이 btime+1이다 
