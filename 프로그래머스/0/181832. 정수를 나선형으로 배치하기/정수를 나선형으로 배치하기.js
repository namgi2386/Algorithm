function solution(n) {
  let arr = Array(n)
    .fill([])
    .map((c) => (c = Array(n).fill(0)));
  let r = 0;
  let c = 0;
  let dr = [0, 1, 0, -1];
  let dc = [1, 0, -1, 0];
  let d = 0;
  for (let idx = 1; idx < n * n + 1; idx++) {
    if (r < 0 || r >= n || c < 0 || c >= n || arr[r][c] !== 0) {
      r -= dr[d];
      c -= dc[d];
      d = (d + 1) % 4;
      r += dr[d];
      c += dc[d];
    }

    arr[r][c] = idx;
    r += dr[d];
    c += dc[d];
  }
  return arr;
}