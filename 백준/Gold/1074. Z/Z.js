const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [_, R, C] = inputValue.split(" ").map(Number);

function fnc(num) {
  cnt = 0;
  answer = 0;
  while (num > 0) {
    if (num & 1) {
      answer += 4 ** cnt;
    }
    num = num >> 1;
    cnt++;
  }
  return answer;
}
console.log(fnc(R) * 2 + fnc(C));

// 0 4 = 16 => 2^2 => 4^2
// 4 0 = 32 => 2^2 => 4^2 *2
// 4 4 = 48
// 0 8 = 64 => 2^3 => 4^(3)
// 8 0 = 128 => 2^3 => 4^(3)*2
// 8 4 = 128 + 16
// 8 8 = 64*3

// 5 6
// 4+1 4+2+0
// 2^2 + 2^0 => (4^2 + 4^0)*2 = (16 + 1)*2 = 34
// 2^2 + 2^1 => 4^2 + 4^1 = 16 + 4 = 20
