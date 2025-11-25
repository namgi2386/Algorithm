const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [C, R, H] = initN;
const board = [];
let stack = [];
let num0 = 0;
for (let h = 0; h < H; h++) {
  const tempBox = [];
  for (let r = 0; r < R; r++) {
    tempBox.push(arr[r + h * R]);
    for (let c = 0; c < C; c++) {
      const num = arr[r + h * R][c];
      if (num === 0) {
        num0++;
      } else if (num === 1) {
        stack.push([h, r, c]);
      }
    }
  }
  board.push(tempBox);
}

function isValid(nh, nr, nc) {
  const result = [];
  if (nr - 1 >= 0 && board[nh][nr - 1][nc] === 0) {
    board[nh][nr - 1][nc] = 1;
    result.push([nh, nr - 1, nc]);
    num0--;
  }

  if (nr + 1 < R && board[nh][nr + 1][nc] === 0) {
    board[nh][nr + 1][nc] = 1;
    result.push([nh, nr + 1, nc]);
    num0--;
  }
  if (nc - 1 >= 0 && board[nh][nr][nc - 1] === 0) {
    board[nh][nr][nc - 1] = 1;
    result.push([nh, nr, nc - 1]);
    num0--;
  }
  if (nc + 1 < C && board[nh][nr][nc + 1] === 0) {
    board[nh][nr][nc + 1] = 1;
    result.push([nh, nr, nc + 1]);
    num0--;
  }
  if (nh - 1 >= 0 && board[nh - 1][nr][nc] === 0) {
    board[nh - 1][nr][nc] = 1;
    result.push([nh - 1, nr, nc]);
    num0--;
  }
  if (nh + 1 < H && board[nh + 1][nr][nc] === 0) {
    board[nh + 1][nr][nc] = 1;
    result.push([nh + 1, nr, nc]);
    num0--;
  }
  return result;
}
let answer = 0;
while (num0 > 0) {
  const newStack = [];
  if (num0 === 0) {
    break;
  }
  while (stack.length > 0) {
    const [nh, nr, nc] = stack.pop();
    const result = isValid(nh, nr, nc);
    // console.log("re:", result);

    newStack.push(...result);
  }
  answer++;
  // console.log("?", newStack, newStack.length);

  if (newStack.length === 0) {
    answer = -1;
    break;
  }
  stack = [...newStack];
}
console.log(answer);
