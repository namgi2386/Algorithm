function solution(numbers) {
    numbers.sort((a,b) => a-b);
    const len = numbers.length;
    const answer = Math.max(numbers[0]*numbers[1] , numbers[len-1]*numbers[len-2]);
    return answer;
}