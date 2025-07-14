function solution(array, commands) {
    let answer = [];
    for(let [s,e,p] of commands){
        let temp = array.slice(s-1,e).sort((a,b)=>a-b)[p-1]
        answer.push(temp)
    }
    return answer;
}