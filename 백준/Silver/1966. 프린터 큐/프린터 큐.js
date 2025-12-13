const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

for (let tc = 0; tc < Number(TC); tc++) {
  const [N, M] = initArr[tc * 2];
  const arr = initArr[tc * 2 + 1];
  if (N === 1) {
    console.log(1);
    continue;
  }
  const sorted = [...new Set([...arr])].sort((a, b) => b - a);
  const sortedLen = sorted.length;
  let sortedIdx = 0;
  let idx = 0;
  let answer = 0;
  let quit = false;
  while (sortedIdx < sortedLen && !quit) {
    const num = sorted[sortedIdx];
    let tempIdx = idx;
    for (let i = 0; i < N; i++) {
      const realIdx = (tempIdx + i) % N;
      if (arr[realIdx] === num) {
        answer++;
        idx = realIdx;
        if (realIdx === M) {
          quit = true;
          break;
        }
      }
    }
    sortedIdx++;
  }
  console.log(answer);
}
