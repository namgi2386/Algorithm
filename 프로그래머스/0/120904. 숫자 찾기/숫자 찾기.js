function solution(num, k) {
    let answer = -1;
    const my_s = num.toString()
    console.log([...my_s]);
    
    [...my_s].forEach(c => {
        if(c == k){
            answer = my_s.indexOf(c)+1;
            return;
        }
    });
    
    return answer;
}