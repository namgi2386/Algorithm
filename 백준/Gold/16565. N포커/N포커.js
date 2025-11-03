const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = Number(inputValue.trim());
function comb(a, b) {
  // a개 중에서 b개를 선택 (aCb)
  if (b === 0 || b === a) return 1;
  if (b > a) return 0;

  // 최적화: nCr = nC(n-r) 이용
  b = Math.min(b, a - b);

  let result = 1;
  for (let i = 0; i < b; i++) {
    result = (result * (a - i)) / (i + 1);
  }

  return Math.floor(result);
}
const MOD = 10007;
function fnc(total, last) {
  if (last <= 3) {
    return 0;
  }
  const H = Math.floor(last / 4); // 최대 포카드 개수
  // console.log("H:", H);
  let sum = 0;
  for (let f = 1; f <= H; f++) {
    let cnt = comb(total / 4, f); // 우선 포카드 처리
    // console.log("cnt:", cnt);
    const lastCards = total - f * 4; // 남은 전체카드
    const lastCnt = last - f * 4; // 남은 my카드 (이걸로 포카드 없이 뽑아야됨)
    if (lastCnt === 0) {
      sum += cnt;
      continue;
    }
    const maximumCnt = comb(lastCards, lastCnt); // 전체경우
    const lastFourCardCnt = fnc(lastCards, lastCnt); // 포카드 경우의 수
    // console.log("::", maximumCnt, lastFourCardCnt);

    sum += ((cnt % MOD) * (maximumCnt - lastFourCardCnt)) % MOD; // last카드 중 f만큼 포카드 했을때 경우의수
    // console.log("sum:", sum);
  }
  return sum % MOD;
}
console.log(fnc(52, N));
