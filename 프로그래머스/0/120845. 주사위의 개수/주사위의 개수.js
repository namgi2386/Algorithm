function solution(box, n) {
    const [a,b,c] = box.map(c => parseInt(c/n))
    return a*b*c;
}