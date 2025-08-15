
function solution(n) {
    let a = 1
    let b = 2
    let c = 2
    for(var i = 3; i <= n; i++){
        c += a
        if(c >= 1000000007) c %=1000000007
        a = b
        b = c
    }
    return c;
}