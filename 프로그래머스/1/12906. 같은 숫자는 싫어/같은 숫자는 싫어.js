function solution(arr) {
    let answer =[]
    let corrent = -1
    for(c of arr){
        if(corrent !== c){
            corrent = c
            answer.push(c)
        }
    }
    return answer;
}