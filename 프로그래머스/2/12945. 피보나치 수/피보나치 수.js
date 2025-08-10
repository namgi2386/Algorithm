function solution(n) {
    let n1 = 0
    let n2 = 1
    let num = 1
    for(let i = 2;i<=n;i++){
        num = (n1+n2)%1234567
        n1 = n2
        n2 = num
    }
    return num%1234567;
}

// a = n*t + a'
// b = m*t + b'
// num = (n+m)*t + a' + b'
// num%t = (a'+b')%t