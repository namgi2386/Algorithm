function solution(n, left, right) {
    const [lr , lc] = [Math.floor(left / n) , left % n]
    const [rr , rc] = [Math.floor(right / n) , right % n]
    let temp = []
    // 123456
    // 223456
    // 333456
    for(let i = lc+1;i < n+1;i++){
        temp.push(i < lr+1 ? lr+1 : i)
    }
    if(lr === rr){
        return temp.slice(0,rc - lc + 1)
    };
    
    for(let i = lr+1; i<rr;i++){
        for(let j = 0; j<i;j++){
            temp.push(i+1)
        };
        for(let j = i+1;j<n+1;j++){
            temp.push(j)
        }
    };
    for(let i = 0; i<rc+1;i++){
        temp.push(i < rr ? rr+1 : i+1)
    }
    return temp
}
//console.log(solution(6, 6,13))
// 123456
// 223456
// 333456
// 444456
// 555556
// 666666