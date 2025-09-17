const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
let map = new Map();
for (let i = 0; i < Number(N); i++) {
  let [name, type] = arr[i].split(" ");
  if (type === "enter") {
    map.set(name, "");
  } else {
    map.delete(name);
  }
}
console.log([...map.keys()].sort().reverse().join("\n"));
