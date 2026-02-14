const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

class Tree {
  constructor(size) {
    this.tree = new Array(4 * size).fill(0);
  }
  update(node, start, end, idx, value) {
    if (start === end) {
      this.tree[node] += value;
      return;
    }
    let mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this.update(node * 2, start, mid, idx, value);
    } else {
      this.update(node * 2 + 1, mid + 1, end, idx, value);
    }
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }
  query(node, start, end, rs, re) {
    if (start > re || end < rs) return 0;
    if (start >= rs && end <= re) return this.tree[node];
    let mid = Math.floor((start + end) / 2);
    let left = this.query(node * 2, start, mid, rs, re);
    let right = this.query(node * 2 + 1, mid + 1, end, rs, re);
    return left + right;
  }
}
let answer = [];
for (let tc = 0; tc < TC; tc++) {
  const [N, M] = initArr[tc * 2];
  const dvdArr = initArr[tc * 2 + 1]; // 초기배열
  let size = N + M; // N개 + 빈칸 M칸

  const tree = new Tree(size); // 트리는 구간합을 저장한다.
  // 초기값 넣기
  // 1번 부터 N번 까지는 초기값
  // N+1번 부터 N+M번 까지는 빈칸 (M번의 작업과정에 사용)
  for (let i = 1; i <= N; i++) {
    tree.update(1, 1, size, i, 1);
  }
  // 높을수록 윗자리 (0번 index는 사용안함)
  // [ 9, 8, 7, 6, 5, 4, 3, 2, 1 ] 이런느낌.
  const idxArr = new Array(N + 1).fill(0).map((_, i) => N + 1 - i); // dvd 현재 위치

  const result = [];
  for (let i = 0; i < M; i++) {
    const dvd = dvdArr[i]; // 선택한 dvd
    const dvdIdx = idxArr[dvd]; // 선택한 dvd의 현재 index
    result.push(tree.query(1, 1, size, dvdIdx + 1, size)); // 위에 있는 dvd의 수
    tree.update(1, 1, size, dvdIdx, -1); // 뽑은놈 -1 해주기
    tree.update(1, 1, size, N + 1 + i, 1); // 빈칸 한자리씩 채우기 = 위에올리기
    idxArr[dvd] = N + 1 + i; // dvd 현재 위치 기록
  }
  answer.push(result.join(" "));
}
console.log(answer.join("\n"));
