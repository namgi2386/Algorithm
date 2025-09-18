const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let initArr = inputValue.split("\n").map((c) => c.trim().split("").map(Number));
let zeroArr = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (initArr[i][j] === 0) {
      zeroArr.push([i, j]);
    }
  }
}
let zeroCnt = zeroArr.length;
let answerArr = [];

function isValid(r, c, num) {
  let rArr = initArr[r];
  let cArr = initArr.map((row) => row[c]);
  // if (r === 2 && c === 6) {
  //   console.log(">>>>>>>>>", num, "<<<<<<<<,");

  //   console.log(rArr);
  //   console.log("###");
  //   console.log(cArr);
  // }
  for (let i = 0; i < 9; i++) {
    if (rArr[i] === num || cArr[i] === num) return false;
  }
  // if (r === 2 && c === 6 && num === 2) {
  //   console.log("passed");
  // }

  function check(n) {
    if (n >= 6) return [6, 7, 8];
    else if (n >= 3) return [3, 4, 5];
    else return [0, 1, 2];
  }
  let rSquireArr = check(r);
  let cSquireArr = check(c);
  // if (r === 2 && c === 6 && num === 2) {
  //   let tempArr = [];
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       tempArr.push(initArr[rSquireArr[i]][cSquireArr[j]]);
  //     }
  //   }
  //   console.log(tempArr);
  // }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (initArr[rSquireArr[i]][cSquireArr[j]] === num) return false;
    }
  }
  return true;
}

let plag = false;
function dfs(zeroIdx) {
  if (zeroIdx === zeroCnt && !plag) {
    for (let i = 0; i < 9; i++) {
      answerArr.push([...initArr[i]]);
    }
    plag = true;
    return;
  }
  for (let num = 1; num < 10; num++) {
    if (plag) return;
    let [r, c] = zeroArr[zeroIdx];
    if (isValid(r, c, num)) {
      initArr[r][c] = num;
      dfs(zeroIdx + 1);
      initArr[r][c] = 0;
    }
  }
}
dfs(0);
console.log(answerArr.map((c) => c.join("")).join("\n"));
