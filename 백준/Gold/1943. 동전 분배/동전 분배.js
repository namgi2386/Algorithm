const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let initArr = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let idx = 0;
while (idx < initArr.length) {
  let N = Number(initArr[idx++]);
  let arr = initArr.slice(idx, idx + N);
  // console.log("arr:",arr);
  let maxMoney = arr.reduce((a, b) => a + b[0] * b[1], 0);
  let halfMoney = maxMoney / 2;
  // console.log("half:", halfMoney);

  let dp = Array(maxMoney + 1).fill(false);
  dp[0] = true;

  function fnc() {
    for (let i = 0; i < N; i++) {
      let [money, cnt] = arr[i];
      for (let j = maxMoney; j >= 0; j--) {
        if (dp[j]) {
          // console.log("in:", j);

          let ccnt = 1;
          while (ccnt <= cnt && j + money * ccnt <= maxMoney) {
            if (j + money * ccnt === halfMoney) return 1;
            dp[j + money * ccnt] = true;
            ccnt++;
          }
        }
      }
    }
    return 0;
  }
  console.log(fnc());
  idx += N;
}
