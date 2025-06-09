function solution(n) {
    var answer = 1 + n;
    if(n===0){
        return 0
    } else if(n===1) {
        return 1
    }
    for(let i=2; i<n-1; i++){
        if(n%i == 0){
            answer += i;
            console.log(n,i)
        }
    }
    return answer;
}