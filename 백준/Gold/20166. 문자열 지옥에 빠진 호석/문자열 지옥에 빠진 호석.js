const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initNums, ...initArr] = inputValue.split("\n").map((c) => c.trim());
const [N, M, K] = initNums.split(" ").map(Number);

let arr = initArr.slice(0, N).map((c) => c.split(""));
let kArr = initArr.slice(N);
const maximumK = Math.max(...kArr.map((c) => c.length));

// 2차원배열 순회하기 (12시부터시계방향)
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];
let map = new Map();

function fnc(r, c, li) {
  let newli = [...li, arr[r][c]];
  let str = newli.join("");
  map.set(str, (map.get(str) || 0) + 1);
  if (newli.length === maximumK) {
    return;
  }
  for (let d = 0; d < 8; d++) {
    let [cr, cc] = [(r + dr[d] + N) % N, (c + dc[d] + M) % M];
    fnc(cr, cc, newli);
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // if (i === 0 && j === 0) {
    //   console.log("node:", i, j);
    // }
    fnc(i, j, []);
    // if (i === 0 && j === 0) {
    //   console.log(map);
    // }
  }
}
let answer = [];
for (let i = 0; i < K; i++) {
  answer.push(map.get(kArr[i]) || 0);
}

console.log(answer.join("\n"));

/*
3 3 2
aaa
aba
aaa
aa
bb

aa bcaa bc
ac abac ab

cb abcb ab
aa bcaa bc
ac abac ab

cb abcb ab
aa bcaa bc
*/
// aba 66
// abc 32
// cab 38

// 0,0노드 시작
// a, aa , aab aac aab aab aaa aab aac aaa
// a, aa , aab4 aac2 aaa2
