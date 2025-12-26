const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n");
N = Number(N);
for (let i = 0; i < N; i++) {
  const arr = initArr[i].split("");
  let prev = 0;
  let result = 0;
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] === "O") {
      result += ++prev;
    } else {
      prev = 0;
    }
  }
  console.log(result);
}
