function solution(n) {
    for(let i = 1 ; i <= n ; i++){
        if(Number(n/i) === i){
            // console.log(Number(n/i))
            return (i+1)**2;
        } else if (Number(n/i) < i){
            return -1
        }
    }
    return -1;
}