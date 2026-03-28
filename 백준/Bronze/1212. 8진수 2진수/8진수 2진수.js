const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const octal = inputValue;
const map = {
  '0': '000', '1': '001', '2': '010', '3': '011',
  '4': '100', '5': '101', '6': '110', '7': '111'
};

let result = '';
for (let i = 0; i < octal.length; i++) {
  result += map[octal[i]];
}

result = result.replace(/^0+/, '') || '0';

console.log(result);