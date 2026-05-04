function solution(info, n, m) {
    const N = info.length;
    const max = 121
    const dp = Array.from({length:N+1} , () => new Array(m).fill(max))
    dp[0][0] = 0
    for(let step = 0; step < N;step++){
        for(let i = 0;i<m;i++){
            const [a,b] = info[step]
            if(i + b < m){
                dp[step+1][i + b] = dp[step][i]
            }
            dp[step+1][i] = Math.min(dp[step+1][i] , dp[step][i] + a)
        }
    }
    console.log(dp)
    let answer = max
    for(let i = 0; i<m;i++){
        answer = Math.min(answer , dp[N][i])
    }
    return answer >= n ? -1 : answer
}