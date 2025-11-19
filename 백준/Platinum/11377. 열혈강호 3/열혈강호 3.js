const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

const [N, M, K] = initN;
const yesIcan = Array.from({ length: N }, () => []);
const taskArr = new Array(M + 1).fill(-1);

for (let i = 0; i < N; i++) {
  const cnt = arr[i][0];
  for (let j = 1; j < cnt + 1; j++) {
    yesIcan[i].push(arr[i][j]);
  }
}

function find(person, visited) {
  if (visited[person]) return false;
  visited[person] = true;
  for (const task of yesIcan[person]) {
    if (taskArr[task] === -1 || find(taskArr[task], visited)) {
      taskArr[task] = person;
      return true;
    }
  }
  return false;
}
let answer1 = 0;
for (let i = 0; i < N; i++) {
  const visited = new Array(M + 1).fill(false);
  const result = find(i, visited);

  if (result) {
    answer1++;
  }
}

let answer2 = 0;
for (let i = 0; i < N; i++) {
  const visited = new Array(M + 1).fill(false);
  if (find(i, visited)) {
    answer2++;
  }
}
console.log(answer1 + (answer2 > K ? K : answer2));
