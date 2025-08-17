function solution(left, right) {
    let answer = 0;
    for(let i=left; i<right+1 ; i++){
        let sq = ~~(Math.sqrt(i))
        if(i === sq*sq){
            answer -= i
        } else {
            answer += i
        }
        // console.log(answer, i , Math.sqrt(i), sq)
    }
    return answer
}