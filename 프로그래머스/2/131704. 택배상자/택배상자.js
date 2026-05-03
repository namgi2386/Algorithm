// 1 2 3 4 5 6 7 8 9
// 4 3 7 8 6 5 2 9 1

// 3 2 1
// 6 5 2 1
function solution(order) {
    const N = order.length;
    const stack = [];
    let idx = 0;
    let answer = 0;
    for(let i = 1; i <= N +1; i++ ){
        if(order[idx] === i){
            answer++;
            idx++;
            continue;
        };
        while(stack.length > 0){
            const peek = stack[stack.length -1];
            if(order[idx] === peek){
                answer++;
                idx++;
                stack.pop();
            } else {
                break;
            };
        };
        stack.push(i);
    };
    return answer;
};