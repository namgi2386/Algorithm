function solution(code) {
  let mode = true;
  let answer = [];
  for (let i = 0; i < code.length; i++) {
    let a = code[i];
    if (a === "1") {
      mode = !mode;
    } else if (mode && !(i % 2)) {
      answer.push(a);
    } else if (!mode && i % 2) {
      answer.push(a);
    }
  }
  if(answer.length === 0) return 'EMPTY'
  return answer.join("");
}