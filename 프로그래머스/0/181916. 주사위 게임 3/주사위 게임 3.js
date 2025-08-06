function solution(a, b, c, d) {
  let dice = Array(7).fill(0);
  dice[a]++;
  dice[b]++;
  dice[c]++;
  dice[d]++;
  const fnc = (a) => {
    if (dice[a] === 4) return 1111 * a;
    if (dice[a] === 3) {
      let answer = 0;
      dice.forEach((t, i) => {
        if (t === 1) answer = (10 * a + i) * (10 * a + i);
      });
      return answer;
    }
    if (dice[a] === 2) {
      let answer = 0;
      let temp = 0;
      dice.forEach((t, i) => {
        if (i !== a && t === 2) {
          answer = Math.abs(a - i) * (a + i);
        }
        if (i !== a && t === 1 && answer === 0) {
          if (!temp) {
            temp = i;
          } else {
            answer = temp * i;
          }
        }
      });
      return answer;
    }
    return -1;
  };
  const letsgo = [a, b, c, d];
  for (let i = 0; i < 4; i++) {
    const letitgo = fnc(letsgo[i]);
    if (letitgo !== -1) return letitgo;
  }
  return Math.min(a, b, c, d);
}
console.log(solution(2, 2, 2, 2));
// console.log(solution(4, 1, 4, 4));
