function solution(my_string) {
    let answer = 0;
    temp = my_string.replace(/[a-zA-z]/g , '@');
    temp.split('@').map(n => {
        n ? answer += parseInt(n) : ''
    });
    return answer;
}