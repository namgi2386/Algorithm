function solution(s) {
  let arr = s.split("");
  let stack = Array();
  let tempStack = Array();
  let answer = 0;
  for (let i = 0; i < arr.length; i++) {
    let t = arr[i];
    if (/[\[{(]/.test(t)) {
      stack.push(t);
    } else {
      if (stack.length === 0) {
        tempStack.push(t);
        answer = 0;
        continue;
      } else {
        let g = stack.pop();
        switch (t) {
          case "]":
            if (g !== "[") return 0;
            break;
          case "}":
            if (g !== "{") return 0;
            break;
          case ")":
            if (g !== "(") return 0;
            break;
        }
      }
    }
    if (stack.length === 0) answer++;
  }
  if (tempStack.length) {
    while (stack.length > 0 && tempStack.length > 0) {
      let a = stack.pop();
      let b = tempStack.shift();
      switch (b) {
        case "]":
          if (a !== "[") return 0;
          break;
        case "}":
          if (a !== "{") return 0;
          break;
        case ")":
          if (a !== "(") return 0;
          break;
      }
    }
    if (tempStack.length || stack.length) return 0;
    answer++;
  }
  return answer;
}