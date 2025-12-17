const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, board, M, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

N = Number(N);
M = Number(M);

const tree = new Array(4 * N).fill(0);

function build(node, start, end) {
  if (start === end) {
    tree[node] = board[start - 1];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = 0;
}
function update(node, start, end, left, right, value) {
  if (start > right || end < left) return;
  if (start >= left && end <= right) {
    tree[node] += value;
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, left, right, value);
  update(node * 2 + 1, mid + 1, end, left, right, value);
}
function query(node, start, end, idx) {
  if (start > idx || end < idx) return 0;
  if (start === end) {
    return tree[node];
  }
  let mid = Math.floor((start + end) / 2);
  const a = query(node * 2, start, mid, idx);
  const b = query(node * 2 + 1, mid + 1, end, idx);
  return tree[node] + a + b;
}

/*
N = 5
        0        
    0     0
  0  3   4  5
  12 00  00 00
        0        
    0     0
  0  9   10  5
  12 00  00 00
*/
build(1, 1, N);
let answer = [];
for (let i = 0; i < M; i++) {
  const line = initArr[i];

  if (line[0] === 1) {
    const [a, b, c] = [line[1], line[2], line[3]];
    update(1, 1, N, a, b, c);
  } else if (line[0] === 2) {
    const result = query(1, 1, N, line[1]);

    answer.push(result);
  }
}
console.log(answer.join("\n"));
