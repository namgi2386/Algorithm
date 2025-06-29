function solution(chicken) {
    if (chicken < 10){
        return 0;
    } else {
        let answer = parseInt(chicken / 9)
        const left = chicken % 9
        if(left === 0){
            answer-=1;
        };
        return answer;
    }
}