function solution(score) {
    var answer = [];
    const len = score.length;
    score.forEach((c,i)=>{
        answer.push([c[0]+c[1] , i+1])
    });
    answer.sort((a,b) => b[0] - a[0]);
    let result = answer;
    let num = 1;
    result[0].push(num)
    for(let i =1; i<len; i++){
        if(result[i][0] !== result[i-1][0]){
            num = i+1;
        }
        result[i].push(num)
    }
    answer.sort((a,b) => a[1] - b[1])
    let real = [];
    answer.forEach(c=> {
        real.push(c[2])
    })
    
    console.log(answer)
    
    return real;
}