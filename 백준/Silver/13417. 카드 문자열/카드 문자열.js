const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue.split("\n").map((c) => c.trim().split(" "));
for (let tc = 0; tc < Number(TC); tc++) {
  const N = Number(arr[tc * 2]);
  let ans = [arr[tc * 2 + 1][0]];
  for (let i = 1; i < N; i++) {
    const num = arr[tc * 2 + 1][i];
    if (ans[0] < num) {
      ans.push(num);
    } else {
      ans.unshift(num);
    }
  }
  console.log(ans.join(""));
}
