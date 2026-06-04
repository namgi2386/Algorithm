function solution(n){
    let answer = 1;
    while(n !== 1){
        if(n % 2 === 0){
            n = n/2;
        }else{
            n--;
            answer++;
        }
    }
    return answer
}
// 1 2 3 6
// 5 4 2 1
// 5000 2500 1250 625. 624 312 156 78 39 38. 19 18. 9 8. 4 2 1.