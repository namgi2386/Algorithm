const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

// ✅ Deque 클래스 구현 (shift/unshift O(1))
class Deque {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }
  
  pushBack(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }
  
  pushFront(item) {
    this.headIndex--;
    this.items[this.headIndex] = item;
  }
  
  popBack() {
    if (this.isEmpty()) return undefined;
    this.tailIndex--;
    const item = this.items[this.tailIndex];
    delete this.items[this.tailIndex];
    return item;
  }
  
  popFront() {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }
  
  front() {
    if (this.isEmpty()) return undefined;
    return this.items[this.headIndex];
  }
  
  back() {
    if (this.isEmpty()) return undefined;
    return this.items[this.tailIndex - 1];
  }
  
  get length() {
    return this.tailIndex - this.headIndex;
  }
  
  isEmpty() {
    return this.length === 0;
  }
}

const lines = inputValue.split('\n');
const n = +lines[0];
const arr = [0, ...lines[1].split(' ').map(Number)];

// 누적합 계산
for (let i = 1; i <= n; i++) {
  arr[i] += arr[i - 1];
}
// 음수 인덱스 방지를 위해 100000 더하기
for (let i = 0; i <= n; i++) {
  arr[i] += 100000;
}

const q = +lines[2];
const queries = [];
for (let i = 0; i < q; i++) {
  const [s, e] = lines[3 + i].split(' ').map(Number);
  queries.push([s - 1, e, i]);
}

// Mo's 정렬
const sq = 400;
queries.sort((a, b) => {
  const blockA = Math.floor(a[0] / sq);
  const blockB = Math.floor(b[0] / sq);
  if (blockA !== blockB) return a[0] - b[0];
  return a[1] - b[1];
});

// ✅ 자료구조 (배열 대신 Deque 사용)
const sz = Math.floor(202020 / sq) + 10;
const pos = Array.from({ length: 202020 }, () => new Deque()); // ✅ Deque로 변경
const cnt = new Array(202020).fill(0);
const bucket = new Array(sz).fill(0);
const ans = new Array(q);

// ✅ 원소 추가 (dir: 0=앞, 1=뒤)
function plus(x, dir) {
  const dq = pos[arr[x]];
  let now = 0;
  
  // 기존 최대 길이 제거
  if (dq.length > 0) {
    now = dq.back() - dq.front(); // ✅ Deque 메서드 사용
    cnt[now]--;
    bucket[Math.floor(now / sq)]--;
  }
  
  // 새 인덱스 추가
  if (dir === 0) {
    dq.pushFront(x); // ✅ O(1)
  } else {
    dq.pushBack(x); // ✅ O(1)
  }
  
  // 새 최대 길이 추가
  now = dq.back() - dq.front();
  cnt[now]++;
  bucket[Math.floor(now / sq)]++;
}

// ✅ 원소 제거 (dir: 0=앞, 1=뒤)
function minus(x, dir) {
  const dq = pos[arr[x]];
  
  // 기존 최대 길이 제거
  let now = dq.back() - dq.front();
  cnt[now]--;
  bucket[Math.floor(now / sq)]--;
  
  // 인덱스 제거
  if (dir === 0) {
    dq.popFront(); // ✅ O(1)
  } else {
    dq.popBack(); // ✅ O(1)
  }
  
  // 남은 원소가 있으면 새 최대 길이 추가
  if (dq.length > 0) {
    now = dq.back() - dq.front();
    cnt[now]++;
    bucket[Math.floor(now / sq)]++;
  }
}

// ✅ O(√N)으로 최댓값 찾기
function query() {
  for (let i = sz - 1; i >= 0; i--) {
    if (bucket[i] === 0) continue;
    
    for (let j = sq - 1; j >= 0; j--) {
      if (cnt[i * sq + j] > 0) {
        return i * sq + j;
      }
    }
  }
  return 0;
}

// 첫 번째 쿼리 초기화
let [s, e, x] = queries[0];
for (let i = s; i <= e; i++) {
  plus(i, 1);
}
ans[x] = query();

// 나머지 쿼리 처리
for (let i = 1; i < q; i++) {
  const [newS, newE, newX] = queries[i];
  
  while (newS < s) plus(--s, 0);
  while (e < newE) plus(++e, 1);
  while (s < newS) minus(s++, 0);
  while (newE < e) minus(e--, 1);
  
  ans[newX] = query();
}

console.log(ans.join('\n'));