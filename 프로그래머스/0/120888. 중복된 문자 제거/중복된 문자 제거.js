function solution(my_string) {
    let strArr = [];
    let answer = '';
    [...my_string].map(c => {
        if(!strArr.includes(c)){
            strArr.push(c);
            answer += c;
        }
    })
    return answer;
}