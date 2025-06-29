function solution(a, b) {
    let primes = [];
    let temp = b;
    for(let i = 2; temp != 1; i++){
        while(temp%i === 0){
            temp /= i;
            if(i !== 2 && i !== 5){
                primes.push(i)                
            }
        };
    };
    let tempA = a;
    for(c of [...primes]){
        if(tempA % c !== 0){
            return 2
        }
        tempA /= c
    }
    return 1
}