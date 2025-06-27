function solution(dots) {
    const a = dots[2][0] === dots[0][0] ? dots[2][0] - dots[1][0] : dots[2][0] - dots[0][0];
    const b = dots[2][1] === dots[0][1] ? dots[2][1] - dots[1][1] : dots[2][1] - dots[0][1] ;
    return Math.max(a*b, -1*a*b);
}