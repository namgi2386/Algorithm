function solution(n) {
  let answer = 0;
  for (let s = 1; s < n + 1; s++) {
    let sum = 0;
    for (let e = s; e < n + 1; e++) {
      sum += e;
      if (sum === n) {
        answer++;
        break;
      } else if (sum > n) {
        break;
      }
    }
  }
  return n===1 ? 1: answer;
}
