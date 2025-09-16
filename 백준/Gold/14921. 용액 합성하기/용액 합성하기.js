const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr] = inputValue.split("\n");
N = Number(N);
arr = arr.split(" ").map(Number);

function t() {
  let answer = arr[0] + arr[1];
  let [s, e] = [0, arr.length - 1];
  while (s < e) {
    let temp = arr[s] + arr[e];
    if (temp === 0) return 0;
    else if (temp > 0) {
      e--;
    } else {
      s++;
    }
    if (Math.abs(answer) >= Math.abs(temp)) answer = temp;
  }
  return answer;
}

console.log(t());
