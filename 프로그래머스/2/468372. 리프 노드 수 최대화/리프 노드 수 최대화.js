function solution(dist_limit, split_limit) {
  let answer = 1;
  function dfs(now, used, lastSplit, leaf) {
    if (used > dist_limit) return; // 분배노드 초과

    // 확정leaf + cur(분배로 변환 가능노드수)
    answer = Math.max(answer, leaf + now);

    for (const c of [2, 3]) {
      const nextSplit = lastSplit * c;
      if (nextSplit > split_limit) continue; // 최대분배곱 초과
      const next = now * c;
      const nextCur = Math.min(next, dist_limit - used);
      const nextLeaf = leaf + (next - nextCur);
      dfs(nextCur, used + nextCur, nextSplit, nextLeaf);
    }
  }

  dfs(1, 1, 1, 0);
  return answer;
}
