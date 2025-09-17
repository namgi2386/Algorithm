const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let set = new Set();
for (let i = 0; i < inputValue.length; i++) {
  for (let j = i; j < inputValue.length; j++) {
    set.add(inputValue.slice(i, j + 1));
  }
}
console.log(set.size);
