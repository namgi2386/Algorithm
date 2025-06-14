function solution(numbers, direction) {
    var answer = [];
    switch (direction) {
        case 'right':
            answer.push(numbers[numbers.length -1 ]);
            numbers.map((c,i) => {
                if(i !== numbers.length - 1){
                    answer.push(c);
                }
            });
            break;
        case 'left':
            numbers.map((c,i) => {
                if(i !== 0){
                    answer.push(c);
                }
            });
            answer.push(numbers[0]);
            break;
    }
    
    return answer;
}