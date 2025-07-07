function solution(new_id) {
  const antiTemp = "~!@#$%^&* ()=+[{]}:?,<>/";
  const anti = antiTemp.split("");
  let answer = new_id.split("").map((c) => c.toLowerCase());
  answer = answer.filter((c) => !anti.includes(c));
  let plag = false;
  for (let i = 0; i < answer.length; i++) {
    if (!plag && answer[i] === ".") {
      plag = true;
    } else if (plag && answer[i] === ".") {
      answer[i] = "@";
    } else if (plag && answer[i] !== ".") {
      plag = false;
    }
  }
  answer = answer.filter((c) => c !== "@");
  answer[0] === "." ? answer.shift() : "";
  answer[answer.length - 1] === "." ? answer.pop() : "";
  if (answer.length === 0 ) {
    answer = ["a", "a", "a"];
  }
  if (answer.length >= 15) {
    answer = answer.slice(0, 15);
    if (answer[14] === ".") {
      answer.pop();
    }
  } else if (answer.length === 1) {
    answer.push(answer[0]);
    answer.push(answer[0]);
  } else if (answer.length === 2) {
    answer.push(answer[1]);
  }

  return answer.join("");
}