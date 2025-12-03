const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
for(const c of arr){
    const [a,b] = c.split(' ').map(Number)
    console.log(a+b)
}