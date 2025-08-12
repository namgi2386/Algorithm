function solution(k, tangerine) {
  let map = new Map();
  for (let i = 0; i < tangerine.length; i++) {
    const s = tangerine[i];
    if (map.has(s)) {
      let num = map.get(tangerine[i]) + 1;
      map.set(s, num);
    } else {
      map.set(s, 1);
    }
  }
  const arr = [...map].sort((a, b) => {
    return b[1] - a[1];
  });
  let answer = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i][1];
    answer++;
    if (sum >= k) return answer;
  }
}