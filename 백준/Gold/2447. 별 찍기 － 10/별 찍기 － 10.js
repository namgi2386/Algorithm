const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let initN = Number(inputValue);
let N = 0;
while (initN !== 1) {
  initN = Math.floor(initN / 3);
  N++;
}
const arr = Array.from({ length: N + 1 }, () => []);
arr[1] = ["***", "* *", "***"];
for (let i = 2; i <= N; i++) {
  for (const c of arr[i - 1]) {
    arr[i].push(c.concat(c).concat(c));
  }
  for (const c of arr[i - 1]) {
    arr[i].push(c.concat(" ".repeat(c.length)).concat(c));
  }
  for (const c of arr[i - 1]) {
    arr[i].push(c.concat(c).concat(c));
  }
}

console.log(arr[N].join("\n"));
