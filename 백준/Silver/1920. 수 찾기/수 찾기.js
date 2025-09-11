const fs = require("fs");
// const inputValue = fs.readFileSync("input.txt").toString().trim();
const inputValue = fs.readFileSync("/dev/stdin").toString().trim();
const inputs = inputValue.split("\n");
const N = parseInt(inputs[0]);

const arrN = new Set(inputs[1].split(" ").map((c) => parseInt(c)));
const M = parseInt(inputs[2]);
const arrM = inputs[3].split(" ").map((c) => parseInt(c));
for (let i = 0; i < M; i++) {
  console.log(arrN.has(arrM[i]) ? "1" : "0");
}
