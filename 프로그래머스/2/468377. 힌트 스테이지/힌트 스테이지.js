/*
#1 0장 + 구매(2,3) = 160원 + 40원 = 200원
#2 1장 = 270원
#3 1장 + 구매(4,5) = 130원 + 20원 = 150원
#4 1장 = 120원
#5 1장 = 70원

// 101

=== 810원

단계 n = 16
비용 = 100,000
n-1단계에 대한 힌트팩 제공된다.
각 힌트팩은 k+1 = 20
힌트 가격 = 1,000,000

*/

function solution(cost, hint) {
    let answer = 20000000;
    const N = cost.length; // 단계수
    const K = hint[0].length - 1; // 힌트팩 당 힌트수
    
    function fnc(hintBinary){
        let fncCost = 0
        const hintMap = new Map()
        for(let i = 0 ; i < N-1; i++){
            if(hintBinary & 1 << i){
                const tinyCost = hint[i][0]
                fncCost += tinyCost
                for(let j = 1 ; j <= K ; j++){
                    hintMap.set(hint[i][j] , (hintMap.get(hint[i][j]) || 0) +1)
                }
            }
        }
        for(let i = 0; i<N;i++){
            const heresHintCnt = hintMap.get(i+1) || 0
            if(cost[0].length <= heresHintCnt){
                fncCost += cost[i][cost[i].length -1]
            }else {
                fncCost += cost[i][heresHintCnt]
            }
            
        }
        
        return fncCost
    }
    // 111111
    for(let i = 0; i < 2 ** (N-1);i++){
        // i = 이번에 힌트 살 단계
        const tempAns = fnc(i)
        // console.log(answer , tempAns , i , N)
        answer = Math.min(answer ,  tempAns)
    }
    
    return answer;
}
