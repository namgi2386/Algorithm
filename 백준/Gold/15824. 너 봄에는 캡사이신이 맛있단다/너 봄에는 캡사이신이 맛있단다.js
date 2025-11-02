const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
arr.sort((a, b) => a - b);
// console.log("arr:", arr);
const DIF = 1000000007;
function fnc() {
  // const nums = new Array(N - 1).fill(-1);
  const H = Math.floor(N / 2);
  const halfNums = new Array(H).fill(0); // 요소 최대 2^32
  const absNum = (N - 1) % 2 ? 1 : 0.5;
  // console.log("NH:", N, H, absNum);
  for (let i = 0; i < N - 1; i++) {
    // nums[i] = arr[i + 1] - arr[i];
    // console.log(
    //   "in",
    //   H - absNum - Math.abs(H - absNum - i),
    //   arr[i + 1],
    //   arr[i]
    // );

    halfNums[H - absNum - Math.abs(H - absNum - i)] += arr[i + 1] - arr[i];
  }
  // console.log("nums:", nums);
  // console.log("half:", halfNums);
  const binArr = new Array(H).fill(0n);
  binArr[0] = (1n << BigInt(N - 1)) - 1n;
  for (let i = 1; i < H; i++) {
    binArr[i] = (binArr[i - 1] << 1n) & (binArr[i - 1] >> 1n);
  }
  // console.log("binArr:", binArr);
  let answer = 0;
  let tempBinSum = 0n;
  for (let i = 0; i < H; i++) {
    tempBinSum = (tempBinSum + binArr[i]) % BigInt(DIF);
    answer =
      (answer +
        Number((BigInt(halfNums[i]) * BigInt(tempBinSum)) % BigInt(DIF))) %
      DIF;
  }
  console.log(answer % DIF);
}
fnc();
