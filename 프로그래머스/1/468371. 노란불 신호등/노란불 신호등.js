function solution(signals) {
  function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  const MAX = signals.map(([a, b, c]) => a+b+c).reduce((a, b) => (a * b) / gcd(a, b));

  for (let t = 1; t <= MAX; t++) {
      let isPossible = true
      for(const [a,b,c] of signals){
          const sum = a+b+c
          const po = (t-1) % sum
          if(!(po >= a && po < a+b)){
              isPossible = false
              break
          }
      }
      if(isPossible) return t
  }

  return -1;
}