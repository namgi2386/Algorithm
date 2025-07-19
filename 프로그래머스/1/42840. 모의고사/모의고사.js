function solution(answers) {
    const no1 = [1, 2, 3, 4, 5,1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5,1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    const no2 = [2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5]
    const no3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
    let cntArr = [0,0,0]
    for(let i =0 ; i<answers.length; i++){
        let cnt = i%40
        if(answers[i] === no1[cnt]) cntArr[0]++
        if(answers[i] === no2[cnt]) cntArr[1]++
        if(answers[i] === no3[cnt]) cntArr[2]++        
    }
    const maxNum = Math.max(cntArr[0],cntArr[1],cntArr[2]);
    let answer = []
    cntArr.map((c,i) => {
        if(c === maxNum){
            answer.push(i+1)
        }
    })
    answer.sort((a,b) => a-b)
    return answer;
}