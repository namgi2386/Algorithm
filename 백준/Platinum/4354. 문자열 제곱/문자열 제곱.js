const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let initArr = inputValue.split("\n").map((c) => c.trim());
let answer = [];

for (let tc = 0; tc < initArr.length; tc++) {
  if (initArr[tc] === ".") break;
  
  let arr = initArr[tc];
  let n = arr.length;
  let kmp = new Array(n).fill(0);
  let j = 0;
  
  for (let i = 1; i < n; i++) {
    while (j > 0 && arr[i] !== arr[j]) {
      j = kmp[j - 1];
    }
    if (arr[i] === arr[j]) {
      j++;
      kmp[i] = j;
    }
  }
  
  // 주기 = n - kmp[n-1]
  let period = n - kmp[n - 1];
  
  if (n % period === 0) {
    answer.push(n / period);
  } else {
    answer.push(1);
  }
}

console.log(answer.join("\n"));