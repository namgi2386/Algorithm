const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [Num, N, arr1, M, arr2] = inputValue.split("\n");
[Num, N, M] = [Num, N, M].map(Number);
[arr1, arr2] = [arr1, arr2].map((arr) => arr.split(" ").map(Number));
let sumArr1 = new Map();
for (let s = 0; s < N; s++) {
  let sum = 0;
  for (let e = s; e < N; e++) {
    sum += arr1[e];
    // if (sum >= Num) break;
    sumArr1.has(sum)
      ? sumArr1.set(sum, sumArr1.get(sum) + 1)
      : sumArr1.set(sum, 1);
  }
}

// console.log(sumArr1);

let answer = 0;

for (let s = 0; s < M; s++) {
  let sum = 0;
  for (let e = s; e < M; e++) {
    sum += arr2[e];
    // if (sum >= Num) break;
    if (sumArr1.has(Num - sum)) {
      // console.log(sum,"=>",Num-sum,":",sumArr1.get(Num - sum));
      answer += sumArr1.get(Num - sum)
    };
  }
}
console.log(answer);