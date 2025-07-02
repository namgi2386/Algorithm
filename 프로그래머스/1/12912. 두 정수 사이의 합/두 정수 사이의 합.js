function solution(a, b) {
    var answer = 0;
    na = Math.min(a,b);
    nb = Math.max(a,b);
    for(let i = na ; i<(nb+1); i++ ){
        answer+=i
    }
    return answer;
}