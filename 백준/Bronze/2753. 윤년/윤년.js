const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const N = Number(inputValue);

function a() {
  if (N % 4 !== 0) {
    return 0;
  } else {
    if (N % 400 === 0) {
      return 1;
    } else if (N % 100 === 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
console.log(a());
