const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
let index = 0;

for (let tc = 0; tc < TC; tc++) {
  const N = Number(arr[index++]);
  const parent = new Array(N + 1).fill(0).map((c, i) => i);
  for (let i = 0; i < N - 1; i++) {
    const [a, b] = arr[index++];
    parent[b] = a;
  }

  const [a, b] = arr[index++];
  const set = new Set();
  let start = a;
  set.add(a);
  while (true) {
    const pa = parent[start];
    if (pa === start) break;
    set.add(pa);
    start = pa;
  }
  start = b;
  if (set.has(b)) {
    process.stdout.write(b.toString());
    process.stdout.write("\n");
    continue;
  }
  while (true) {
    const pa = parent[start];
    if (set.has(pa)) {
      process.stdout.write(pa.toString());
      process.stdout.write("\n");
      break;
    }
    start = pa;
  }
}
