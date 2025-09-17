const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue.split("\n").map((c) => c.trim());
let idx = 0;

for (let tc = 0; tc < TC; tc++) {
  let map = new Map();
  let N = Number(arr[idx]);

  for (let i = idx + 1; i < idx + N + 1; i++) {
    let type = arr[i].split(" ")[1];
    map.set(type, (map.get(type) || 0) + 1);
  }
  let numArr = [...map.values()].map((c) => c + 1);
  let answer = numArr.reduce((a, b) => a * b, 1) - 1;
  console.log(answer);

  idx += N + 1;
}
