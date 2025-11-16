const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
const N = initN[0] * initN[1];
console.log(arr.map((c) => c - N).join(" "));
