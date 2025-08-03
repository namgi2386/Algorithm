function solution(queue1, queue2) {
  const sum1 = queue1.reduce((a, b) => b + a);
  const sum2 = queue2.reduce((a, b) => b + a);
  const sumAll = sum1 + sum2;
  if (sumAll % 2) return -1;
  if (sum1 === sum2) return 0;
  const half = Math.floor(sumAll / 2);
  queue1.forEach((c) => {
    if (c > half) return -1;
  });
  queue2.forEach((c) => {
    if (c > half) return -1;
  });
  let smallArr = new Array();
  let bigArr = new Array();
  let smallSum = 0;
  let bigSum = 0;
  if (sum1 <= sum2) {
    smallArr = queue1;
    bigArr = queue2;
    smallSum = sum1;
    bigSum = sum2;
  } else {
    smallArr = queue2;
    bigArr = queue1;
    smallSum = sum2;
    bigSum = sum1;
  }
  let sIdx = 0;
  let answer = 0;
  let tempArr = smallArr.concat(bigArr);

  for (let i = 0; i < bigArr.length; i++) {
    answer++;
    smallSum += bigArr[i];
    if (smallSum === half) {
      return answer;
    } else if (smallSum > half) {
      // console.log(answer, smallSum);
      for (let j = sIdx; j < tempArr.length; j++) {
        answer++;
        smallSum -= tempArr[j];
        // console.log(answer, smallSum);
        if (smallSum === half) {
          return answer;
        } else if (smallSum < half) {
          sIdx = j + 1;
          break;
        }
      }
    }
  }
  return -1;
}