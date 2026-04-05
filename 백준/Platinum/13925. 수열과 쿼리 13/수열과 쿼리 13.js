const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(BigInt));
N = Number(N);
const MOD = 1000000007n;
const arr = initArr[0];
const M = Number(initArr[1]);

const tree = new Array(N * 4).fill(0n);
const lazy = Array.from({ length: 4 * N }, () => [0n, 1n]);

function propagation(node, start, end) {
  if (lazy[node][0] === 0n && lazy[node][1] === 1n) return;
  const len = BigInt(end - start + 1);
  tree[node] = (tree[node] * lazy[node][1] + lazy[node][0] * len) % MOD;

  if (start !== end) {
    const left = node << 1;
    const right = left + 1;

    // 곱셈만 먼저 하고
    lazy[left][1] = lazy[left][1] * lazy[node][1];
    lazy[right][1] = lazy[right][1] * lazy[node][1];
    lazy[left][0] = lazy[left][0] * lazy[node][1] + lazy[node][0];
    lazy[right][0] = lazy[right][0] * lazy[node][1] + lazy[node][0];

    // 한 번에 mod (오버플로우 방지만)
    lazy[left][1] %= MOD;
    lazy[right][1] %= MOD;
    lazy[left][0] %= MOD;
    lazy[right][0] %= MOD;
  }

  lazy[node][0] = 0n;
  lazy[node][1] = 1n;
}
function update(node, start, end, ls, rs, value, type) {
  propagation(node, start, end);
  if (rs < start || end < ls) return;
  if (ls <= start && end <= rs) {
    if (type === 1n) {
      lazy[node][0] += value;
    } else if (type === 2n) {
      lazy[node][1] *= value;
      lazy[node][0] *= value;
    } else if (type === 3n) {
      lazy[node][1] = 0n;
      lazy[node][0] = value;
    }
    propagation(node, start, end);
    return;
  }
  const mid = (start + end) >> 1;
  const left = node << 1;
  update(left, start, mid, ls, rs, value, type);
  update(left + 1, mid + 1, end, ls, rs, value, type);
  tree[node] = tree[left] + tree[left + 1];
  tree[node] %= MOD;
}
function query(node, start, end, ls, rs) {
  propagation(node, start, end);
  if (rs < start || end < ls) return 0n;
  if (ls <= start && end <= rs) return tree[node];
  const mid = (start + end) >> 1;
  const left = node << 1;
  return (
    query(left, start, mid, ls, rs) + query(left + 1, mid + 1, end, ls, rs)
  );
}
function build(node, start, end) {
  if (start === end) {
    tree[node] = arr[start - 1] % MOD;
    return;
  }
  const mid = (start + end) >> 1;
  const left = node << 1;
  build(left, start, mid);
  build(left + 1, mid + 1, end);
  tree[node] = (tree[left] + tree[left + 1]) % MOD;
}

build(1, 1, N);
const answer = [];
for (let i = 2; i < 2 + M; i++) {
  const line = initArr[i];
  if (line[0] === 4n) {
    const [type, a, b] = line;
    const result = query(1, 1, N, a, b);
    answer.push(Number(result % MOD));
  } else {
    const [type, a, b, c] = line;
    update(1, 1, N, a, b, c, type);
  }
}
console.log(answer.join("\n"));
