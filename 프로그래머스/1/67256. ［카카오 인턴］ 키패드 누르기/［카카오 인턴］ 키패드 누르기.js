function solution(numbers, hand) {
  let map = new Map();
  for (let i = 0; i < 3; i++) {
    const num = 1 + 3 * i;
    map.set(num, "L");
    map.set(num + 2, "R");
  }

  const numPad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["*", 0, "#"],
  ];
  let met = new Map();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      met.set(numPad[i][j], [i, j]);
    }
  }

  let lastLeftHand = "*";
  let lastRightHand = "#";
  let answer = [];

  // setting 완
  
  for (let i = 0; i < numbers.length; i++) {
    const num = numbers[i];
    if (map.has(num)) {
      const lr = map.get(num);
      answer.push(lr);
      lr === "L" ? (lastLeftHand = num) : (lastRightHand = num);
    } else {
      const [nr, nc] = met.get(num);
      const [lr, lc] = met.get(lastLeftHand);
      const [rr, rc] = met.get(lastRightHand);
      const dis =
        Math.abs(nr - lr) +
        Math.abs(nc - lc) -
        Math.abs(nr - rr) -
        Math.abs(nc - rc);
      if (dis < 0) {
        answer.push("L");
        lastLeftHand = num;
      } else if (dis > 0) {
        answer.push("R");
        lastRightHand = num;
      } else {
        if (hand === "left") {
          answer.push("L");
          lastLeftHand = num;
        } else {
          answer.push("R");
          lastRightHand = num;
        }
      }
    }
  }

  return answer.join('');
}

// const data = [
//   [[1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"],
//   [[7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2], "left"],
//   [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], "right"],
// ];
// for (let [arr, t] of data) {
//   console.log(solution(arr, t));
// }

// 1 2 3
// 4 5 6
// 7 8 9
// * 0 #

// "LRLLLRLLRRL"
// "LRLLRRLLLRR"
// "LLRLLRLLRL"
