const input = [];

require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}).on('line', function(line) {
  input.push(line);
}).on('close', function() {
  
  const [N, K, D] = input[0].split(" ").map(Number);
  
  const rules = [];
  for (let i = 1; i <= K; i++) {
    const [a, b, c] = input[i].split(" ").map(Number);
    rules.push([a, b, c]);
  }
  
  let start = 1;
  let end = N;
  let answer = N;
  
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    let sum = 0;
    
    for (const [a, b, c] of rules) {
      if (a > mid) continue;
      sum += Math.floor((Math.min(b, mid) - a) / c) + 1;
    }
    
    if (sum >= D) {
      answer = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  
  console.log(answer);
  process.exit();
});