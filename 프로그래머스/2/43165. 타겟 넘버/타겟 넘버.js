function solution(numbers, target) {
  let answer = 0;
  const fnc = (stack, sum) => {
    if (!stack.length) {
      if (sum === target) answer++;
    } else {
      const num = stack.pop();
      fnc([...stack], sum + num);
      fnc([...stack], sum - num);
    }
  };
  fnc(numbers, 0);
  return answer;
}