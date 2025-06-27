function solution(balls, share) {
    const s = Math.min(share , balls-share);
    let answer = 1;
    
    for(let i=0; i<s; i++){
        answer *= (balls - i);
        answer /= (i+1);
    }
    return answer;
};