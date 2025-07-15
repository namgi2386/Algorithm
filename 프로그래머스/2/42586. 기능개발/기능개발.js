function solution(progresses, speeds) {
    let arr = progresses.map((c,i) => Math.ceil((100-c)/speeds[i]));
    let temp = 1;
    let num = 0;
    let answer =[];
    for(c of arr){
        if(!num){
            num = c;
            temp = 1;
        } else {
            if(num >= c){
                temp++;
            } else {
                num = c;
                answer.push(temp);
                temp = 1;
            }
        }
    }
    console.log(arr)
    answer.push(temp)
    return answer;
}