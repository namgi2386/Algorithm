function solution(fees, records) {
    const map = new Map()
    for(const re of records){
        const [rawTime , num , type] = re.split(' ');
        const [h , m] = rawTime.split(':').map(Number);
        if(map.has(num)){
            const [prevH , prevM, prevType , prevTimeSum ] = map.get(num);
            if(type === "OUT"){
                // 정산
                let totalSum = prevTimeSum
                if(prevM <= m){
                    totalSum += (h - prevH) * 60
                    totalSum += m - prevM
                } else {
                    totalSum += 60 - prevM
                    totalSum += m
                    totalSum += (h - prevH -1) * 60
                }
                map.set(num , [h , m , type , totalSum ])
            } else if (type === "IN"){
                // 시간 추가
                map.set(num , [h , m, type , prevTimeSum])
            }
        } else {
            map.set(num , [h,m,type,0])
        };
    };
    const answerMap = [...map]
    answerMap.sort((a,b) => Number(a[0]) - Number(b[0]))
    const answer =[]
    const [dt , dc, at, ac] = fees // 기본 , 단위
    answerMap.forEach(c => {
        let [eh,em , et, eSum] = c[1]
        
        let costSum = dc
        if(et === "IN"){
            if(eh === 23){
                eSum += 59 - em
            } else {
                eSum += 60 - em
                eSum += (23 - eh -1) * 60
                eSum += 59
            }
        }
        if(eSum > dt){
            costSum += Math.ceil((eSum - dt)/ at) * ac
        }
        answer.push(costSum)
    })
    return answer
}