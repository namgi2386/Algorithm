function solution(a, b) {
    const c = Number(`${a}${b}`);
    const d = Number(`${b}${a}`);
    let answer = 1;
    if(c >= d){
        answer = c 
    } else {
        answer = d
    }
    
    return answer;
}