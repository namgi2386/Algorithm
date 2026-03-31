const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [a, b, c] = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim());

let map = new Map();
const color = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];
let idx = 0;
for (const c of color) {
  map.set(c, idx++);
}
console.log((map.get(a) * 10 + map.get(b)) * 10 ** map.get(c));