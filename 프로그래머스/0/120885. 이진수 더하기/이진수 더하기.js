function solution(bin1, bin2) {
  const tempNums = (Number(bin1) + Number(bin2)).toString().split("");
  for (let i = tempNums.length - 1; i >= 0; i--) {
    // console.log(i, tempNums[i], tempNums);
    if (tempNums[i] == "2" && i != 0) {
      tempNums[i - 1] = Number(tempNums[i - 1]) + 1;
      tempNums[i] = 0;
    } else if (tempNums[i] == "3" && i != 0) {
      tempNums[i - 1] = Number(tempNums[i - 1]) + 1;
      tempNums[i] = 1;
    } else if (tempNums[i] == "2" && i == 0) {
      tempNums.unshift(1);
      tempNums[i + 1] = 0;
    } else if (tempNums[i] == "3" && i == 0) {
      tempNums.unshift(1);
      tempNums[i + 1] = 1;
    }
  }

  return tempNums.join("");
}