const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());

let [n, m, k] = initN.split(" ").map(Number); // 당연히 Number
let arr = [0n, ...initArr.slice(0, n).map(BigInt)]; // tree에넣을 숫자들만 BigInt
let variArr = initArr.slice(n).map((c) => c.split(" ").map(Number)); // 여기도 Number

const tree = new Array(4 * n).fill(0n); // 트리 초기값 BigInt

// 트리 초기화
function build(node, start, end) {
  if (start === end) {
    tree[node] = arr[start]; // 초기화값은 어짜피 입력받은BigInt 사용함
    return;
  }
  const mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

// 트리 업데이트
function update(node, start, end, idx, value) {
  if (idx < start || idx > end) return;
  if (start === end) {
    tree[node] = value; // 업데이트값도 입력받은BigInt
    return;
  }
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, idx, value);
  update(node * 2 + 1, mid + 1, end, idx, value);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

// 구간 쿼리
function query(node, start, end, rs, re) {
  if (re < start || rs > end) return 0n; // 0 BigInt 수정
  if (rs <= start && re >= end) return tree[node];
  const mid = Math.floor((start + end) / 2);
  let leftSum = query(node * 2, start, mid, rs, re);
  let rightSum = query(node * 2 + 1, mid + 1, end, rs, re);
  return leftSum + rightSum;
}

build(1, 1, n); // 인덱스값들은 Number

const result = [];
for (let i = 0; i < variArr.length; i++) {
  const [a, b, c] = variArr[i];
  if (a === 1) update(1, 1, n, b, BigInt(c)); // 변경할 값인 c는 BigInt
  else result.push(query(1, 1, n, b, c));
}

console.log(result.join("\n"));
