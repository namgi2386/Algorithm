const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const M = parseInt(inputValue);

function GCD(a, b) {
  var r = a % b;
  if (r === 0) return b;
  return GCD(b, r);
}

// 첫사람 선택 (경우의 수 3가지)
// 첫사람이 11시 ~ 12시 M분전 도착 (경우의 수 60-M)
// 나머지 사람은 첫사람 도착시간 기준 앞뒤로 M범위 내에 분포함 (경우의 수 M*M)
const c1 = 3 * (60 - M) * M * M;
// 셋 모두 12시 M분전 ~ 12시에 도착 (순서무관 경우의 수 M * M * M)
const c2 = M ** 3;

// 경우의수 , 전체
const num = c1 + c2;
const total = 60 ** 3;

/**
 *
 *
 * 출력
 *
 */
var gcd = GCD(num, total);
console.log(num / gcd + "/" + total / gcd);
