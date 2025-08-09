function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  let queue = [];
  let index = 0;
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  const isValid = (r, c) => {
    return 0 <= r && r < n && 0 <= c && c < m;
  };
  // let visited = Array(n)
  //   .fill("")
  //   .map((c) => Array(m).fill(false));
  queue.push([0, 0, 1]);
  maps[0][0] = 0;
  while (queue.length > index) {
    const [pr, pc, num] = queue[index];
    // visited[pr][pc] = true;
    if (pr === n - 1 && pc === m - 1) return num;
    for (let d = 0; d < 4; d++) {
      const r = pr + dr[d];
      const c = pc + dc[d];
      if (isValid(r, c) && maps[r][c]) {
        queue.push([r, c, num + 1]);
        maps[r][c] = 0;
      }
    }
    index++;
  }
  return -1;
}