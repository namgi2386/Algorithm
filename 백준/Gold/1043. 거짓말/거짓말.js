const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, board, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const dp = Array.from({ length: 51 }, () => new Set());
const blacklist = [];

for (let i = 1; i < board.length; i++) {
  blacklist.push(board[i]);
}
for (let i = 0; i < M; i++) {
  for (let j = 1; j < arr[i][0] + 1; j++) {
    dp[arr[i][j]].add(i);
  }
}
const checked = new Set();
const brokenParty = new Set();
while (blacklist.length > 0) {
  const start = blacklist.pop(); // 블랙리스트 맴버 뽑기

  if (checked.has(start)) continue; // 이미 체크한 블랙리스트 pass
  checked.add(start); // 체크
  for (const partyIdx of dp[start]) {
    // 해당 맴버가 속한 파티 번호
    if (brokenParty.has(partyIdx)) continue; // 망한파티번호 체크
    brokenParty.add(partyIdx); // 해당파티 체크
    for (let i = 1; i < arr[partyIdx][0] + 1; i++) {
      const next = arr[partyIdx][i]; // 파티에 속한 사람
      if (checked.has(next)) continue;
      blacklist.push(next); // 블랙리스트 등록
    }
  }
}

console.log(M - brokenParty.size);
