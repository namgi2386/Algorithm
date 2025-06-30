function solution(common) {
    const dif1 = common[1] - common[0];
    const dif2 = common[2] - common[1];
    let answer = common[common.length-1]
    if (dif1 === dif2){
        answer += dif1;
    } else {
        answer *= parseInt(common[1]/common[0])
    };
    return answer;
}

    // 1 2 4
    // a ar arr
    // a a+b a+2b
    
    // a+b = ar => a(r-1) = b
    // a+2b = arr => a(r^2 -1) = 2b
    // a(r^2 -1) = 2a(r-1)
    // 2 = r+1 # a!=0
    // r^2 - 1 = 2r -2 
    // r^2 -2r +1 
    // (r-1)^2 = 0
    // r = 1 , b = 0