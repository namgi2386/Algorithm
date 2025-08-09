function solution(rectangles, characterXs, characterYs, itemXs, itemYs) {
  let rectangle = rectangles.map((c) => c.map((cin) => cin * 2));
  let [characterX, characterY, itemX, itemY] = [
    characterXs * 2,
    characterYs * 2,
    itemXs * 2,
    itemYs * 2,
  ];
  let arr = Array(105)
    .fill(0)
    .map((c) => Array(105).fill(0));
  for (let idx = 0; idx < rectangle.length; idx++) {
    const [sx, sy, ex, ey] = rectangle[idx];
    for (let i = sx; i < ex + 1; i++) {
      for (let j = sy; j < ey + 1; j++) {
        if (i === sx || i === ex || j === sy || j === ey) {
          if (arr[i][j] === 0) {
            arr[i][j] = 1;
          }
        } else {
          arr[i][j] = 9;
        }
      }
    }
  }
  const dr = [1, -1, 0, 0];
  const dc = [0, 0, 1, -1];
  let start = [characterX, characterY, 0]; // 마지막은 카운트값
  let queue = [start];

  //시작점을 탐색하면 안되므로 0으로 설정해준다.
  arr[characterX][characterY] = 0;

  //BFS 탐색을 시작한다.
  while (queue.length > 0) {
    let [x, y, cnt] = queue.shift();

    if (x === itemX && y === itemY) {
      return cnt / 2;
    }

    for (let d = 0; d < 4; d++) {
      let nx = x + dr[d];
      let ny = y + dc[d];
      if (arr[nx][ny] === 1) {
        queue.push([nx, ny, cnt + 1]);
        arr[nx][ny] = 0;
      }
    }
  }

  return 0;
}