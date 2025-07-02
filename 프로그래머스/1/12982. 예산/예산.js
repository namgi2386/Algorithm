function solution(d, budget) {
    d = d.sort((a,b)=> a-b)
    let temp = 0;
    let answer = 0;
    for(let i=0;i<d.length;i++){
        temp+= d[i]
        if(temp <= budget){
            answer++;
        }
    }
    return answer;
}