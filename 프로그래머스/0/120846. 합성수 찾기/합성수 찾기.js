function solution(n) {
    let answer = 0;
    if(n==1 || n==2 ) return answer;
    const evenNum = parseInt((n-2)/2);
    answer += evenNum;
    // console.log(answer)
    let primeNums = [2];
    for(let i=3; i<=n; i+=2){
        let yn = false;
        Array.from(primeNums, c => {
            if(i%c==0) {
                // console.log(i , c)
                yn = true;
            };
        });
        yn ? answer++ : primeNums.push(i);
    }
    return answer;
}