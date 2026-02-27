const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, ...arr] = inputValue.split("\n").map((c) => c.trim().split("."));
const map = new Map();
for (const [_, c] of arr) {
  map.set(c, (map.get(c) || 0) + 1);
}
console.log(
  [...map]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((c) => c.join(" "))
    .join("\n"),
);
