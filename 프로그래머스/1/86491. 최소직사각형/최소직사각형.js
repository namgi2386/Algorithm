function solution(sizes) {
    let frontMax = 0;
    let backMax = 0;
    for(let i= 0 ; i< sizes.length; i++){
        let [s , e] = sizes[i]
        let a = Math.max(s,e)
        let b = Math.min(s,e)
        frontMax = Math.max( frontMax , a)
        backMax = Math.max( backMax , b)
    }
    return frontMax *backMax;
}