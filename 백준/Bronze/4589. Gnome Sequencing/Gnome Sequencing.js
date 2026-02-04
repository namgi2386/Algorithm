const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [n, ...lines] = inputValue.split("\n");
const answers = ["Gnomes:"];

for (let i = 0; i < Number(n); i++) {
  const arr = lines[i].trim().split(" ").map(Number);
  const isOrdered = 
    (arr[0] < arr[1] && arr[1] < arr[2]) || 
    (arr[0] > arr[1] && arr[1] > arr[2]);
  answers.push(isOrdered ? "Ordered" : "Unordered");
}

console.log(answers.join("\n"));