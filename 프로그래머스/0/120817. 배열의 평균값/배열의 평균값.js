function solution(numbers) {
    var answer = 0;
    return numbers.reduce((a,b)=>a+b,0)/numbers.length;
}