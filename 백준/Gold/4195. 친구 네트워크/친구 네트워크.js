const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue.split("\n");

TC = Number(TC);
let tcIdx = 0;

while (tcIdx < initArr.length) {
  const map = new Map(); // a 는 idx번째
  let list = []; // list[idx] = a의 부모 번호
  let idx = 0; // 신규 인원에 부여할 idx
  const king = new Map();

  const N = Number(initArr[tcIdx++]);

  for (let i = 0; i < N; i++) {
    let [a, b] = initArr[tcIdx + i].trim().split(" ");
    // 둘다 신규
    // 둘 중 하나만 신규
    // 둘디 중고
    if (!map.has(a) && !map.has(b)) {
      map.set(a, idx);
      map.set(b, idx + 1);
      list.push(idx); // a부모는 a
      list.push(idx); // b부모는 b
      king.set(idx, 2);
      idx += 2;
    } else if (!map.has(a)) {
      // b는 중고
      map.set(a, idx++); // a 등록
      let bIdx = list[map.get(b)]; // b부모
      while (bIdx !== list[bIdx]) {
        bIdx = list[bIdx];
      }
      list.push(bIdx); // a의 부모는 b의부모와 같도록
      // console.log("??", king.get(bIdx));

      king.set(bIdx, king.get(bIdx) + 1);
    } else if (!map.has(b)) {
      map.set(b, idx++);
      let aIdx = list[map.get(a)];
      while (aIdx !== list[aIdx]) {
        aIdx = list[aIdx];
      }
      list.push(aIdx);
      king.set(aIdx, king.get(aIdx) + 1);
    } else {
      let aIdx = list[map.get(a)]; // a 부모번호
      let bIdx = list[map.get(b)]; // b 부모번호
      while (aIdx !== list[aIdx]) {
        aIdx = list[aIdx];
      }
      while (bIdx !== list[bIdx]) {
        bIdx = list[bIdx];
      }
      // console.log("in", a, aIdx, b, bIdx);

      if (aIdx > bIdx) {
        list[aIdx] = bIdx;
        king.set(bIdx, king.get(bIdx) + king.get(aIdx));
      } else if (aIdx < bIdx) {
        list[bIdx] = aIdx;
        king.set(aIdx, king.get(aIdx) + king.get(bIdx));
      }
    }

    // console.log(b, map);
    let bIdx = list[map.get(b)]; // b부모
    while (bIdx !== list[bIdx]) {
      bIdx = list[bIdx];
    }
    console.log(king.get(list[bIdx]));
  }

  tcIdx += N;
}
