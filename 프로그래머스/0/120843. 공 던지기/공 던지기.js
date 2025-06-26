function solution(numbers, k) {
    const len = numbers.length
    let answer =0;
    if(k === 1 || len === 1){
        answer = numbers[0];
    } else {
        answer = numbers[(2*k-2)%len];
    }
    return answer;
}
//1 1 , 2 3, 3 5 2, 4 7 2k-1
// 1 2 3 4 5 6 7 8 9 10 11 13
// 1 3 5 7 9 11 13 15 17 19 21
// 0 2 4 6 8 10 