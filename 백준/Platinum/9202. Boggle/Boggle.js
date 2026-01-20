const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim());

const N = Number(inputValue[0]);
let idx = 1 + N;
const dicArr = inputValue.slice(1, idx++).sort((a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length;
  } else {
    return a.localeCompare(b);
  }
});
// console.log("DIC: ", dicArr);

const M = Number(inputValue[idx++]);

function fnc1(a, b) {
  return a * 4 + b;
}
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];
function fnc2(prevNum, nextNodeNum) {
  const [pr, pc] = [Math.floor(prevNum / 4), prevNum % 4];
  const [nr, nc] = [Math.floor(nextNodeNum / 4), nextNodeNum % 4];
  for (let d = 0; d < 8; d++) {
    if (nr === pr + dr[d] && nc === pc + dc[d]) {
      return true;
    }
  }
  return false;
}
function fnc3(board, text, idx, maxLen, visited, prevNum) {
  // console.log(
  //   "vi",
  //   visited,
  //   "[",
  //   Math.floor(prevNum / 4),
  //   prevNum % 4,
  //   "]",
  //   idx,
  //   maxLen,
  // );

  if (idx === maxLen) {
    return true;
  }
  if (!board.has(text[idx])) {
    return false;
  }
  for (let nextNodeNum of board.get(text[idx])) {
    const temp = 1 << nextNodeNum;
    // console.log("ub:", visited, temp, visited & temp);

    if (visited & temp) continue;
    // 가능한 자리인지 검증
    if (!fnc2(prevNum, nextNodeNum)) continue;
    const result = fnc3(
      board,
      text,
      idx + 1,
      maxLen,
      visited + temp,
      nextNodeNum,
    );

    if (result) return true;
  }
  return false;
}

for (let i = 0; i < M; i++) {
  const board = new Map();
  const rowBoard = inputValue.slice(idx, idx + 4);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const char = rowBoard[i][j];
      if (board.has(char)) {
        board.get(char).push(fnc1(i, j));
      } else {
        board.set(char, [fnc1(i, j)]);
      }
    }
  }
  idx += 5;
  // console.log("BOARD", i, ":", board);
  let answerPonit = 0;
  let answerText = "";
  let answerCnt = 0;
  let prevText = "";
  for (let i = 0; i < N; i++) {
    // DIC 에서 단어하나 꺼냄
    const text = dicArr[i];
    if (prevText === text) {
      continue;
    } else {
      prevText = text;
    }
    if (!board.has(text[0])) continue;
    for (let startNodeNum of board.get(text[0])) {
      const isPossible = fnc3(
        board,
        text,
        1,
        text.length,
        1 << startNodeNum,
        startNodeNum,
      );
      if (isPossible) {
        answerCnt++;

        if (answerText.length < text.length) {
          answerText = text;
        } else if (
          answerText.length === text.length &&
          [text, answerText].sort()[0] === text
        ) {
          answerText = text;
        }
        if (text.length === 3 || text.length === 4) {
          answerPonit += 1;
        } else if (text.length === 5) {
          answerPonit += 2;
        } else if (text.length === 6) {
          answerPonit += 3;
        } else if (text.length === 7) {
          answerPonit += 5;
        } else if (text.length === 8) {
          answerPonit += 11;
        }
        break;
      }
    }
  }
  console.log(`${answerPonit} ${answerText} ${answerCnt}`);
}
