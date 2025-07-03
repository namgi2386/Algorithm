function solution(N, stages) {
    let arr = Array.from({length:N+2} , () => new Array(2).fill(0))
    for(let i=0;i<stages.length;i++){
        const num = Number(stages[i])
        for(let j=1;j<=num;j++){
            if(j===num){
                arr[j][1]++;
                break;
            }
            arr[j][0]++;
            arr[j][1]++;
        };
        // console.log(arr)
    };
    // console.log(arr)
    let map = new Map();
    for(let i = 1; i<N+1;i++){
        if(arr[i][1] === 0){
            map.set(i,0)
            continue;
        }
        map.set(i, 1 - arr[i][0]/arr[i][1]);
    };
    let answer = [...map].sort((a,b)=> b[1] - a[1])
    console.log(answer)
    
    return answer.map(c => c[0]);
}
