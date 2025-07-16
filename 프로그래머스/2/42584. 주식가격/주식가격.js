function solution(prices) {
  let answer = Array(prices.length)
    .fill(0)
    .map((_, i) => prices.length - i - 1);
  for (let i = 0; i < prices.length; i++) {
    let num = prices.length - 1 - i;
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] < prices[i]) {
        // console.log(`${prices[i]}(${i + 1}번째) to ${prices[j]}(${j + 1}번째)`);
        num = j - i;
        answer[i] = num;
        // console.log(answer);
        break;
      }
    }
  }
  return answer;
}