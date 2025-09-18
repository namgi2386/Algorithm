const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initNums, ...arr] = inputValue.split("\n").map((c) => c.trim());
const [N, M] = initNums.split(" ").map(Number);
let idx = 0;
let mapGroup = new Map();
let mapName = new Map();
for (let tc = 0; tc < N; tc++) {
  const groupName = arr[idx];
  idx++;
  const groupNum = arr[idx];
  idx++;
  let li = [];
  for (let i = 0; i < groupNum; i++) {
    li.push(arr[idx]);
    mapName.set(arr[idx], groupName);
    idx++;
  }
  mapGroup.set(groupName, li);
}
let answer = [];
for (let i = 0; i < M; i++) {
  const quiz = arr[idx];
  idx++;
  const type = arr[idx];
  idx++;
  if (type === "1") {
    answer.push(mapName.get(quiz));
  } else {
    mapGroup
      .get(quiz)
      .sort()
      .forEach((c) => {
        answer.push(c);
      });
  }
}
console.log(answer.join("\n"));
