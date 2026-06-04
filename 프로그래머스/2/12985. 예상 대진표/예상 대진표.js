function solution(n,a,b){
    let an = Math.floor((a+1)/2);
    let bn = Math.floor((b+1)/2);
    let answer = 1
    while(an !== bn){
        an = Math.floor((an+1)/2)
        bn = Math.floor((bn+1)/2)
        answer++
    }
    return answer
}
// 12 34 56 78
//    2     4
//   1    2
//     1