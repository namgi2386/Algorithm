const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initNums, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" "));

function realTime(time) {
  let [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

const [T1, T2, T3] = initNums.map(realTime); 
// 06:00 12:00 18:00 => 360 720 1080

let set = new Set();
let answerSet = new Set();

for (let i = 0; i < arr.length; i++) {
  let [time, name] = arr[i];
  let min = realTime(time);
  if (min ===0 || (min > 0 && min <= T1)) {
    set.add(name);
  } else if (min === T2 || min === T3 || (min > T2 && min < T3)) {
    if (set.has(name)) answerSet.add(name);
  }
}
console.log(answerSet.size);
