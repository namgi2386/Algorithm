const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, inOrder, postOrder] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
inOrder = inOrder.split(" ").map(Number);
postOrder = postOrder.split(" ").map(Number);

let answer = [];

function fnc(ins, ine, pos, poe) {
  // inArr의 시작,끝 인덱스 그리고 postArr의 인덱스
  if (ins > ine) return;

  // post마지막이 root
  let root = postOrder[poe];
  answer.push(root);

  // 중위에서 root를 기준으로 좌우에 서브트리가 구분됨
  let rootIdx = inOrder.indexOf(root);

  // inArr의 순서는 [...왼쪽트리, root, ...오른트리]
  // postArr의 순서는 [...왼쪽트리, ...오른트리, root]

  fnc(ins, rootIdx - 1, pos, pos + rootIdx - ins - 1);
  fnc(rootIdx + 1, ine, pos + rootIdx - ins, poe - 1);
}
fnc(0, N - 1, 0, N - 1);
console.log(answer.join(" "));
