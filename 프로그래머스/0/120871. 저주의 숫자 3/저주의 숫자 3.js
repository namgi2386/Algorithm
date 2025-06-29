function solution(n) {
    let count = 1;
    let answer = 1;
    while(count !== n){
        count++;
        answer++;
        let ai = true;
        while(ai){
            if(answer%3 === 0){
                answer++;
                continue;
            }
            if(answer.toString().includes('3')){
                answer++;
                continue;
            }
            ai = false;
        };
    }
    return answer;
}