function solution(land) {
  for (let i = 1; i < land.length; i++) {
    const prevArr = land[i - 1];
    const prevMaxNum = Math.max(...prevArr); // 이전행 최댓값
    const previousColumn = prevArr.indexOf(prevMaxNum); // 이전행 최댓값 인덱스
    const currentRow = land[i];
    for (let i = 0; i < currentRow.length; i++) {
      if (i === previousColumn) {
        const sliced = [
          ...prevArr.slice(0, previousColumn),
          ...prevArr.slice(previousColumn + 1),
        ]; // 이전행 최댓값 인덱스와 동일한 인덱스라면, 해당인덱스 빼고 나머지
        currentRow[i] += Math.max(...sliced); // 중에서 최댓값을 더하기
        continue;
      }
      currentRow[i] += prevMaxNum; // 이전행 최댓값 더하기
    }
  }

  return Math.max(...land[land.length - 1]);
}