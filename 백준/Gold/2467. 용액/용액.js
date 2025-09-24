const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
arr = arr.split(" ").map(Number);
arr.sort((a, b) => a - b);

function fnc() {
  // 모두 양수
  if (arr[0] >= 0) {
    return [arr[0], arr[1]].join(" ");
  }
  // 모두 음수  
  if (arr[N - 1] <= 0) {
    return [arr[N - 2], arr[N - 1]].join(" ");
  }
  
  // 음수와 양수가 섞여있는 경우
  let answerSum = Infinity;
  let answer = [];
  
  // 투포인터: 양 끝에서 시작
  let [s, e] = [0, N - 1];
  
  while (s < e) {
    let sum = arr[s] + arr[e];
    let absSum = Math.abs(sum);
    
    if (absSum < answerSum) {
      answerSum = absSum;
      answer = [arr[s], arr[e]];
    }
    
    if (sum === 0) {
      break;
    } else if (sum < 0) {
      s++;
    } else {
      e--;
    }
  }
  
  return answer.join(" ");
}

console.log(fnc());