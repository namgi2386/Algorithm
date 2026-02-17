const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split('\n');
const N = parseInt(lines[0]);
const arr = lines[1].split(' ').map(Number);

const stack = [];
let ans = 0;

for (let i = 0; i <= N; i++) {
  // 현재 값 (N번째는 0으로 처리해서 스택 전부 비움)
  const cur = i === N ? 0 : arr[i];
  
  while (stack.length > 0 && arr[stack[stack.length - 1]] > cur) {
    const top = stack.pop();
    const minVal = arr[top];
    
    // 폭 계산
    const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
    
    ans = Math.max(ans, minVal * width);
  }
  
  stack.push(i);
}

process.stdout.write(String(ans));
