function solution(s) {
    let sNum = s;
    const answer = [0,0];
    while(sNum !== "1"){
        answer[0]++;
        let len = sNum.length;
        let cnt = 0;
        sNum.split("").map(c=> {if(c === "0")cnt++});
        answer[1] += cnt;
        sNum = (len - cnt).toString(2);
    };
    return answer;

}