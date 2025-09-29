const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, arr] = inputValue.split("\n").map((c) => c.trim());
let [N, initM] = initN.split(" ").map(Number);
let M = initM;
arr = arr.split("").map(Number);
let stack = [];
for (let i = 0; i < N; i++) {
  while (stack.length > 0 && M > 0) {
    let peek = stack.pop();
    M--;
    if (peek < arr[i]) continue;
    stack.push(peek);
    stack.push(arr[i]);
    M++;
    break;
  }
  if (stack.length === 0 || M === 0) {
    stack.push(arr[i]);
  }
}
// console.log(stack, N, M);

console.log(stack.slice(0, N - initM).join(""));

// N M
// 10 4
//   77 5 841
// 4177252841
// 41772
//    725
//     252
//       28

// 4 까지 인덱스 중 가장큰수 선택
// 2번인덱스 선택됨
// 2개 사용됨 2개남음
// 3번인덱스부터 5번인덱스까지 중 큰수
// 3번인덱스 선택됨
// 사용안함
// 4-6번 중큰수
// 5번인덱스 선택
// 1개 사용 1개남음
// 6-7번 중 7번 선택
// 다사용 함
// 나머지 그대로

// 제한조건 체크 K<N<= 50만
// 50만개 중 가장 큰수
// 50만 -> 1까지 전부다 체크하기
// 50만 * 50만 /2 === 500,000 * 500,000 /2
// 125,000,000,000 === 1250억 절대불가
// 1000배 이상 효율 증가시켜야됨
