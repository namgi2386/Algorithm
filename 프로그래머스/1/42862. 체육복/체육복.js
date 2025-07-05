function solution(n, lost, reserve) {
    lost.sort((a,b) => a-b);
    reserve.sort((a,b) => a-b);
    
    // 차집합
    const realLost = lost.filter(l => !reserve.includes(l));
    const realReserve = reserve.filter(r => !lost.includes(r));
    
    let borrowed = 0;
    const used = new Array(realReserve.length).fill(false);
    
    for(let i = 0; i < realLost.length; i++){
        for(let j = 0; j < realReserve.length; j++){
            if(!used[j] && Math.abs(realLost[i] - realReserve[j]) === 1){
                used[j] = true;
                borrowed++;
                break;
            }
        }
    }
    
    return n - realLost.length + borrowed;
}