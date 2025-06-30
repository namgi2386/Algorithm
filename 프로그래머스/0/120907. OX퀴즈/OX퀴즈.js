function solution(quiz) {
    let answer = [];
    quiz.map(c => {
        const arr = c.split(' ');
        if(arr[1] === '+'){
            const temp = Number(arr[0]) + Number(arr[2]);
            if(temp === Number(arr[4])){
                answer.push('O')
            } else {
                answer.push('X')
            };
        } else {
            const temp = Number(arr[0]) - Number(arr[2]);
            if(temp === Number(arr[4])){
                answer.push('O')
            } else {
                answer.push('X')
            };
        }
    })
    return answer;
}