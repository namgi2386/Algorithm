function solution(a, d, included) {
    // 3 7 11 15 19
    let num = 0
    for(let i = 0 ; i < included.length; i++){
        if(included[i]){
            num += a + (d*i)
        }
        
    }
    return num;
}