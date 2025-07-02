function solution(n) {
    if(n%2){
        return 2;
    }
    for(let i = 3 ; i < n; i+=2){
        if(n%i === 1){
            return i
        }
    }
}