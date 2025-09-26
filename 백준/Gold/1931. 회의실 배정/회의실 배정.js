const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n");
N = Number(N);
arr = arr.map((c) => c.split(" ").map(Number));
arr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});
let postEnd = 0;
let answer = 0;
//let answerArr = [];
for (let i = 0; i < N; i++) {
  if (arr[i][0] >= postEnd) {
    answer++;
    //answerArr.push(arr[i]);
    postEnd = arr[i][1];
  }
}

//console.log(answerArr);
console.log(answer);
