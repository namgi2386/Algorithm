function solution(m, n, startX, startY, balls) {
    function dist(ax,ay,bx,by){
        const [dx , dy] = [Math.abs(ax - bx), Math.abs(ay - by)]
        return dx**2 + dy**2
    }
    const anglePosition = [[0,0] , [m,0] , [0,n] , [m,n]]
    function isSameAngle (ax,ay,bx,by,idx){
        const [ap1 , ap2] = anglePosition[idx] 
        const [dax ,day ,dbx ,dby] = [ap1 - ax,ap2 - ay,ap1 - bx,ap2 - by]
        const isPossible = dax * dby === day * dbx && dax**2 + day**2 < dbx**2 + dby**2
        if(isPossible){
            return dist(ap1 + dax , ap2 + day , bx , by)
        } else {
            return -1
        }
    }
    function fnc(ax , ay , bx , by){
        let answer = n**2 + m**2
        if(ax !== bx || ay < by){
            // 아래
            const ans = dist(ax , ay * -1 , bx , by)
            answer = Math.min(answer , ans)
        }
        if(ax !== bx || ay > by){
            // 위
              const ans = dist(ax , (2 * n )- ay , bx , by)
            answer = Math.min(answer , ans)
        }
        if(ay !== by || ax < bx){
            // 왼
              const ans = dist(ax * -1 , ay , bx , by)
            answer = Math.min(answer , ans)
        }
        if(ay !== by || ax > bx){
            // 오른
              const ans = dist((2 * m) - ax , ay , bx , by)
            answer = Math.min(answer , ans)
        }
        for(let i = 0 ; i < 4;i++){
            const temp = isSameAngle(ax,ay,bx,by,i)
            if(temp !== -1){
                answer = Math.min(answer , temp);
                break;
            }
        };
        return answer
    }
    const answers = []
    for(const [bx,by] of balls){
        answers.push(fnc(startX , startY , bx , by))
    }
    return answers
}