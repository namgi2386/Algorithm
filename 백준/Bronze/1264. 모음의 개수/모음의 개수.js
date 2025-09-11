const fs = require("fs");
// const inputValue = fs.readFileSync("input.txt").toString().trim();
const inputValue = fs.readFileSync("/dev/stdin").toString().trim();
const inputs = inputValue.split("\n");
for (let tc = 0; tc < inputs.length; tc++) {
  const input = inputs[tc];
  if (input === "#") continue;
  let answer = 0;
  input.split("").forEach((c) => {
    if (/^[aeiouAEIOU]$/.test(c)) answer++;
  });
  console.log(answer);
}
