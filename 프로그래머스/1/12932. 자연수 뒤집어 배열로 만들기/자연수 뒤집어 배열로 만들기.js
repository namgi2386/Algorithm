function solution(n) {
    return n.toString().split('').reverse().map(c => Number(c));
}