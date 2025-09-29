const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [x, y, z] = initN.split(" ").map(Number);
N = Number(N);
let cubes = new Array(N).fill(0);
for (let i = 0; i < N; i++) {
  cubes[i] = initArr[i].split(" ").map(Number)[1];
}
let maxPossibleSize = Math.min(
  Math.min(x - 1, y - 1, z - 1).toString(2).length,
  N - 1
);

let usedInCurSize = 0; // 현재 크기 기준으로 사용된 큐브 개수
let totalUsed = 0; // 실제 사용한 총 큐브 개수

// 큰 큐브부터 작은 큐브로 내려가며 처리
for (let size = maxPossibleSize; size >= 0; size--) {
  // 이전에 사용한 큰 큐브들은 현재 크기로 8배 환산
  usedInCurSize *= 8;

  const cubeLen = 1 << size; // 2^size

  // 현재 크기 큐브로 박스를 채울 수 있는 총 개수
  const canFitX = Math.floor(x / cubeLen);
  const canFitY = Math.floor(y / cubeLen);
  const canFitZ = Math.floor(z / cubeLen);
  const totalCanFit = canFitX * canFitY * canFitZ;

  // 실제로 사용 가능한 개수 = 들어갈 수 있는 개수 - 이미 사용된 개수
  const needToUse = totalCanFit - usedInCurSize;
  const actualUse = Math.min(needToUse, cubes[size]);

  usedInCurSize += actualUse;
  totalUsed += actualUse;
}

// 박스를 완전히 채웠는지 확인
console.log(usedInCurSize === x * y * z ? totalUsed : -1);