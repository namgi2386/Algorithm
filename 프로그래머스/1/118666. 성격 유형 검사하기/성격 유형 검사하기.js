function solution(survey, choices) {
  let map = new Map();
  const chart = ["RT", "CF", "JM", "AN"];
  for (let c of chart) {
    map.set(c[0], 0);
    map.set(c[1], 0);
  }

  const len = survey.length;
  for (let i = 0; i < len; i++) {
    const k_type = survey[i];
    const k_check = Number(choices[i]);
    const X = k_type[0];
    const Y = k_type[1];
    if (k_check === 4) {
      continue;
    }
    k_check < 4
      ? map.set(X, map.get(X) + Math.abs(k_check - 4))
      : map.set(Y, map.get(Y) + Math.abs(k_check - 4));
  }
  let answer = "";
  for (let c of chart) {
    const a = map.get(c[0]);
    const b = map.get(c[1]);
    b > a ? (answer += c[1]) : (answer += c[0]);
  }
  return answer;
}