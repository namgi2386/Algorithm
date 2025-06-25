function solution(s) {
    let answer = 0;
    const arr = s.split(' ')
    arr.forEach((c,i) => {
        if(Number.isFinite(Number(c))){
            answer += parseInt(c);
        } else {
            console.log(c,i,arr[i-1])
            answer -= arr[i-1]
        }
    })
    return answer;
}