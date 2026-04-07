const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim().split(" "));

const N = Number(inputValue[0]);
const answer = [];

let idx = 1;
for (let tc = 0; tc < N; tc++) {
  const [catCnt, dogCnt, v] = inputValue[idx++].map(Number);
  const cats = []; // [살리는 고양이 , 지우는 강아지] 배열
  const dogs = []; // [살리는 강아지 , 지우는 고양이] 배열
  for (let i = 0; i < v; i++) {
    const [keepRaw, removeRaw] = inputValue[idx++];
    const keep = Number(keepRaw.substring(1)) - 1; // 0-indexed
    const remove = Number(removeRaw.substring(1)) - 1; // 0-indexed
    if (keepRaw[0] === "C") {
      cats.push([keep, remove]);
    } else {
      dogs.push([keep, remove]);
    }
  }
  // 고양이살리자 기준으로 충돌하는 강아지살리자 놈들 index 저장해두기
  // cats의 index-1 번호와 dogs의 index-1 번호가 충돌한다.
  const graph = Array.from({ length: cats.length + 1 }, () => []);
  for (let i = 0; i < cats.length; i++) {
    for (let j = 0; j < dogs.length; j++) {
      if (cats[i][0] === dogs[j][1] || cats[i][1] === dogs[j][0]) {
        graph[i].push(j);
      }
    }
  }
  let matchCnt = 0;
  let time = 0;
  const match = new Array(dogs.length + 1).fill(-1);
  const visited = new Array(dogs.length + 1).fill(0);

  function dfs(catMomIdx) {
    for (const dogMomIdx of graph[catMomIdx]) {
      // visited 재사용 하기 위해 time 사용한다.
      // 단, catMomIdx에 time이 1:1 매칭되는게 아니다. 재귀되면서 catMomIdx가 변하니깐.
      // 첫시작할때의 catMomIdx만이 time에 1:1 매칭된다.
      if (visited[dogMomIdx] === time) continue;
      visited[dogMomIdx] = time;
      // 선택받은적없는 dogMom이면 선점하고 끝냄
      // 선택받은적 있는 dogMom이라면, 이전에 선택했던 catMom값이 match[dogMomIdx]에 저장되어 있을것이다.
      // 즉, 이전에 선택했었던 catMom인 match[dogMomIdx]로 dfs를 재탐색 한다. 즉, 강제로 바꾸도록 한다.
      if (match[dogMomIdx] === -1 || dfs(match[dogMomIdx])) {
        match[dogMomIdx] = catMomIdx;
        return true;
      }
    }
    return false;
  }
  for (let i = 0; i < cats.length; i++) {
    time++;
    // 캣맘 하나씩 출동
    const result = dfs(i);
    if (result) matchCnt++;
  }
  answer.push(v - matchCnt);
}
console.log(answer.join("\n"));
