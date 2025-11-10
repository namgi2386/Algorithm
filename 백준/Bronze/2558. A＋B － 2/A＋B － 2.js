const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim().split('\n');

console.log(Number(inputValue[0]) + Number(inputValue[1]));
