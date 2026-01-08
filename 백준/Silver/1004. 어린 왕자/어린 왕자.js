const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue.split("\n");
TC = Number(TC);
let tcIdx = 0;

function distance(ax, ay, bx, by, r) {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2) < r;
}

for (let tc = 0; tc < TC; tc++) {
  let [sx, sy, ex, ey] = initArr[tcIdx++].split(" ").map(Number);
  let N = initArr[tcIdx++];
  let answer = 0;
  for (let i = 0; i < N; i++) {
    let [x, y, r] = initArr[tcIdx++].split(" ").map(Number);
    const isS = distance(sx, sy, x, y, r);
    const isE = distance(ex, ey, x, y, r);

    if ((isS && !isE) || (!isS && isE)) answer++;
  }
  console.log(answer);
}
