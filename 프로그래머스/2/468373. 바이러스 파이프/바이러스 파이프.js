const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

function solution(n, infection, edges, k) {
  // Union-Find
  class UnionFind {
    constructor(size) {
      this.parent = Array.from({ length: size }, (_, i) => i);
    }

    find(idx) {
      if (this.parent[idx] !== idx) {
        this.parent[idx] = this.find(this.parent[idx]);
      }
      return this.parent[idx];
    }
    union(a, b) {
      const pa = this.find(a);
      const pb = this.find(b);
      if (pa !== pb) {
        this.parent[pb] = pa;
      }
    }
    log() {
      return this.parent.join(" | ");
    }
  }

  // 타입별 Union-Find 3개 생성
  const uf = [
    new UnionFind(n + 1), // A 타입 (인덱스 0)
    new UnionFind(n + 1), // B 타입 (인덱스 1)
    new UnionFind(n + 1), // C 타입 (인덱스 2)
  ];

  // 엣지를 타입별로 union
  for (const [x, y, type] of edges) {
    uf[type - 1].union(x, y);
  }
  // console.log("T: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10");
  // console.log("A:", uf[0].log());
  // console.log("B:", uf[1].log());
  // console.log("C:", uf[2].log());

  let answer = 1;

  // 시뮬레이션 run
  function fnc(stack) {
    const set = new Set([infection]); // 시작 넣기

    for (const type of stack) {
      const newSet = new Set();

      // 현재 감염된 노드들의 루트를 모두 구함
      const prevSet = new Set();
      for (const node of set) {
        prevSet.add(uf[type].find(node));
      }

      // 모든 노드를 순회하며 같은 루트를 가진 노드 감염
      for (let node = 1; node <= n; node++) {
        if (!set.has(node) && prevSet.has(uf[type].find(node))) {
          newSet.add(node);
        }
      }

      // 새로 감염된 노드 추가
      for (const node of newSet) {
        set.add(node);
      }

      // 더 이상 감염 안 되면 중단
      if (newSet.size === 0) break;
    }

    return set.size;
  }

  // 백트래킹으로 타입 순서 생성
  function dfs(stack) {
    if (stack.length > 0) {
      answer = Math.max(answer, fnc(stack));
    }

    // 조기 종료: 모든 노드 감염됨
    if (answer === n) return;

    if (stack.length === k) return;

    for (let type = 0; type < 3; type++) {
      // 연속 중복 방지 (같은 타입 연속은 의미 없음)
      if (stack.length > 0 && stack[stack.length - 1] === type) continue;

      stack.push(type);
      dfs(stack);
      stack.pop();
    }
  }

  dfs([]);
  return answer;
}
