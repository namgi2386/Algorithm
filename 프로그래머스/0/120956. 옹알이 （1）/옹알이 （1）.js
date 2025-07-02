function solution(babbling) {
  let answer = 0;
  const answerArr = ["aya", "ye", "woo", "ma"];
  for (let i = 0; i < babbling.length; i++) {
    let temp = babbling[i]; // ayaye
    for (let j = 0; j < 4; j++) {
      console.log("first : ", temp, answerArr[j]);
      temp = temp.split(answerArr[j]).join(j);
    } // 0102ae3
    let isCo = true;
    [...temp].map((c) => {
      if (0 <= c && c <= 9) {
      } else {
        isCo = false;
      }
    });
    let tempSet = new Set([...temp])
    console.log(temp, isCo , [...temp].length , [...tempSet].length , [...temp].length === [...tempSet].length );
    if (isCo && [...temp].length === [...tempSet].length) {
        console.log('ee')
      answer++;
    }
  }
  return answer;
}