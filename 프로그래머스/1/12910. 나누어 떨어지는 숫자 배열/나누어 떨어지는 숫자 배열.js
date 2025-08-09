function solution(arr, divisor) {
    let answer = []
    arr.forEach(c=>{
    if(c%divisor === 0){
answer.push(c)}
})
    if(answer.length === 0) return [-1]
answer.sort((a,b)=> a-b)
    
    return answer;
}