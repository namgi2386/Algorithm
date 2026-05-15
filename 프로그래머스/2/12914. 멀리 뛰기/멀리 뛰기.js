function solution(n) {
    if(n === 1) return 1;
    let [p1 , p2] = [1,2];
    for(let i = 0; i<n -2;i++){
        [p1,p2] = [p2 , (p1 + p2) % 1234567]
    }
    return p2;
};