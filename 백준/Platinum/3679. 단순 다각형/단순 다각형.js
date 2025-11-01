const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let answer = [];
// main
for (let tc = 0; tc < Number(TC); tc++) {
  let tcAnswer = [];
  const N = initArr[tc][0];
  const positions = new Array(N).fill([0, 0]);
  // 좌표저장 + 기준점 찾기
  let [polarX, polarY] = [Infinity, Infinity];
  let polarIdx = -1;
  for (let i = 0; i < N; i++) {
    positions[i] = [initArr[tc][i * 2 + 1], initArr[tc][i * 2 + 2]];

    if (polarY >= initArr[tc][i * 2 + 2]) {
      if (polarY === initArr[tc][i * 2 + 2] && polarX < initArr[tc][i * 2 + 1])
        continue;
      [polarX, polarY] = [initArr[tc][i * 2 + 1], initArr[tc][i * 2 + 2]];
      polarIdx = i;
    }
  }
  const angles = [];
  let maxAngle = 0;
  for (let i = 0; i < N; i++) {
    // 기준점기준 [ 각도 , 거리 , index ] 를 저장히자

    const angle = Math.atan2(
      positions[i][1] - polarY,
      positions[i][0] - polarX
    );
    const dist =
      (positions[i][1] - polarY) ** 2 + (positions[i][0] - polarX) ** 2;
    angles.push([angle, dist, i]);
    if (maxAngle < angle) maxAngle = angle;
  }
  // 각도순 거리순으로 정렬
  angles.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return a[0] - b[0];
  });

  // 최대각도 그룹을 내림차순 정렬로 수정하면 끝
  angles.sort((a, b) => {
    if (a[0] === maxAngle && a[0] === b[0]) {
      return b[1] - a[1];
    }
  });

  answer.push(angles.map((c) => c[2]));
}
// output
console.log(answer.map((c) => c.join(" ")).join("\n"));
