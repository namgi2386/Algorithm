function solution(n) {
    let i = 1;
    let answer = 1;
    while (i <= n){
        answer++;
        i*=answer;
    };
    return answer-1;
}