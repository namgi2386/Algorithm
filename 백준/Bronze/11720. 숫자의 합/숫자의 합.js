const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N , arr] = inputValue.split('\n')
arr = arr.split('')
let answer = 0
for(const c of arr){
    answer += Number(c)
}
console.log(answer)