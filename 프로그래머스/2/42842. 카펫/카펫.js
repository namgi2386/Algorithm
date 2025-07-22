function solution(brown, yellow) {
    const temp = ( ~~(brown/2) - 2 )
    for(let i = 1; i<=yellow; i++){
        if(i*(temp-i) === yellow) return [temp-i+2 , i+2]
    }
}