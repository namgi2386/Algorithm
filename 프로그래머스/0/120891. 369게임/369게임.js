function solution(order) {
    let answer = 0;
    // const order = 0
    // console.log(order.toString().split(''))
    const a = order.toString().split('').map(c => {if(c%3 == 0 && c != 0){
        // console.log(c)
        answer++
    }});
    return answer;
}