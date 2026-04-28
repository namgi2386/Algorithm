function solution(signals) {
    // 345 , 10 11 12 = 3부터 5주기 = 3 + 5a (+2)
    // 4 11 = 4부터 7주기 = 4 + 7b
    // 3 7 11 = 3부터 4주기 = 3 + 4c
    
    // 2 8 14 2부터 +6 = 2 + 6a
    // 3 9 15 3부터 +6b
    // 4 10 16 4부터 +6c
    // 5 11 17 5부터 +6d
    const N = signals.length
    const MAX = 10000000
    const visited = new Array(MAX).fill(0)
    let answer = -1
    for(let i = 0; i<N;i++){
        const [a,b,c] = signals[i]
        const jump = a + b + c
        
        for(let v = a+1; v <MAX; v += jump ){
            if(answer !== -1)break
            for(let po = 0; po < b;po++){
                visited[v + po]++
                if(i === N-1 && visited[v + po] === N){
                    answer = v + po
                    break
                }
            }
        }
    }
    return answer;
}