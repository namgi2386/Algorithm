function solution(n, info) {
  const bestArrowCntArr = info.map((c) => c + 1); // 최적포인트
  let maxDiff = 0; // 최대 점수차로 변경
  let result = [-1]; // 결과값
  let ryan = new Array(11).fill(0); // visited 대신 실제 화살 개수 저장

  function fnc(idx, ArrowCnt) {
    if (idx === 11) {
      // 남은 화살 0점에 모두 쏘기
      if (ArrowCnt < n) {
        ryan[10] += n - ArrowCnt;
      }
      
      // 점수 계산 - 매번 새로 계산해야 함
      let lionSum = 0;
      let peachSum = 0;
      
      for (let i = 0; i < 11; i++) {
        if (ryan[i] > info[i]) {
          lionSum += 10 - i;
        } else if (info[i] > 0) {
          peachSum += 10 - i;
        }
      }
      
      const diffPoint = lionSum - peachSum;

      if (diffPoint > 0 && diffPoint > maxDiff) {
        maxDiff = diffPoint;
        result = [...ryan]; // 깊은 복사
      } else if (diffPoint > 0 && diffPoint === maxDiff) {
        // 낮은 점수를 더 많이 맞힌 경우 비교
        for (let i = 10; i >= 0; i--) {
          if (ryan[i] > result[i]) {
            result = [...ryan];
            break;
          } else if (result[i] > ryan[i]) {
            break;
          }
        }
      }
      
      // 남은 화살 복구
      if (ArrowCnt < n) {
        ryan[10] -= n - ArrowCnt;
      }
      return;
    }
    
    // 이 점수 포기
    fnc(idx + 1, ArrowCnt);
    
    // 이 점수 가져가기 (어피치보다 1발 더)
    if (ArrowCnt + bestArrowCntArr[idx] <= n) {
      ryan[idx] = bestArrowCntArr[idx];
      fnc(idx + 1, ArrowCnt + bestArrowCntArr[idx]);
      ryan[idx] = 0; // 백트래킹 복원
    }
  }

  fnc(0, 0);
  
  return result;
}