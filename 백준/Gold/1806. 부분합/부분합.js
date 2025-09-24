const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, arr] = inputValue.split("\n").map((c) => c.trim());
let [N, S] = initN.split(" ").map(Number);
arr = arr.split(" ").map(Number);

function fnc() {
  let [s, e] = [0, 0];
  let answer = Infinity;
  let sum = arr[0];
  if (sum >= S) return 1;
  // console.log("시작(", N, S, "):", arr.join(" "));

  while (s <= e && e < N) {
    // console.log(s, e, ":sum=", sum);
    if (sum >= S) {
      answer = Math.min(answer, e - s + 1);
      sum -= arr[s++];
    } else {
      sum += arr[++e];
    }
  }
  if (answer === Infinity) answer = 0;
  return answer;
}
console.log(fnc());
