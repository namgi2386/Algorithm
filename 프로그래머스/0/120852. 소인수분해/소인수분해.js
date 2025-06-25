function solution(n) {
  let num = Number(n);
  let primes = [2];
  let lastPrime = 2;
  let answer = new Set();
  // num값이 0이 아니라면 반복
  // lastPrime 값으로 나눠진다면 끝까지 반복
  // 안나눠지며
  while (num !== 1) {
    while (num % lastPrime === 0) {
      num /= lastPrime;
      answer.add(lastPrime);
    }
    let isPrime = false;
    while (!isPrime) {
      lastPrime += 1;
      isPrime = true;
      for (c of primes) {
        if (lastPrime % c === 0) {
          isPrime = false;
        }
      }
    }
    primes.push(lastPrime);
  }
  return [...answer];
}