function solution(k, dungeons) {
  const len = dungeons.length;
  let visited = Array(len).fill(false);
  let answer = 0;
  const fnc = (rest, value) => {
    // console.log(rest, value, answer, visited);
    for (let i = 0; i < len; i++) {
      if (visited[i]) {
        // console.log(rest, value, answer, visited, i);
        continue;
      }
      const [a, b] = dungeons[i];
      if (a <= rest) {
        visited[i] = true;
        fnc(rest - b, value + 1);
        visited[i] = false;
      } else {
        answer = Math.max(answer, value);
      }
    }
    answer = Math.max(answer, value);
  };
  fnc(k, 0);
  return answer;
}