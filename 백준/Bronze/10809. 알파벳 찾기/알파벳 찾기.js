const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const result = [];
for (let i = 0; i < 26; i++) {
  const c = String.fromCharCode(97 + i);
  result.push(inputValue.indexOf(c));
}
console.log(result.join(' '));