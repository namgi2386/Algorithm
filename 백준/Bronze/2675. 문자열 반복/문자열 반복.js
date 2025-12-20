const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue.split("\n").map((c) => c.trim());

TC = Number(TC);

for (let tc = 0; tc < TC; tc++) {
  let [N, str] = arr[tc].split(" ");
  N = Number(N);
  str = str.split("");
  let answer = "";
  for (const c of str) {
    for (let i = 0; i < N; i++) {
      answer += c;
    }
  }
  console.log(answer);
}
