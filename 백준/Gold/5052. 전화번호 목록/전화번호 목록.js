const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let index = 0;
for (let tc = 0; tc < TC; tc++) {
  const N = Number(initArr[index++]);
  const arr = initArr.slice(index, index + N).sort();
  let answer = true;
  for (let i = 0; i < N - 1; i++) {
    const node = arr[i];
    if (node === arr[i + 1].slice(0, node.length)) {
      answer = false;
      break;
    }
  }
  console.log(answer ? "YES" : "NO");

  index += N;
}
