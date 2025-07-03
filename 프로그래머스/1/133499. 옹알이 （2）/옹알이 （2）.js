function solution(babbling) {
    const joka = ["aya","ye","woo","ma"]
    let answer = 0;
    for(let idx = 0; idx < babbling.length; idx++ ){
        let isCo = true
        for(let i = 0; i<4;i++){
            babbling[idx] = babbling[idx].split(joka[i]).join(i)
            if(babbling[idx].includes('' + i + i)){
                isCo = false;
                break;
            };
        };
        if(/^\d+$/.test(babbling[idx]) && isCo){
            console.log('tr:',babbling[idx])
            answer++;
        } else {
            console.log('false:',babbling[idx])
        }
    }
    
    // 00 121 a 23 1111 222
    
    return answer;
}