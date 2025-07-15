function solution(priorities, location) {
    // 가장큰수
    // 가장 큰수의 idx
    // idx 이전까지 슬라이싱 해서 뒤로 보냄
    // shift
    // 전부다 뺄때까지 반복
    let cnt = 0;
    let idxArr = priorities.map((c,i)=>[c,i]);
    let dawooni = priorities.sort((a,b)=>a-b);
    // console.log(dawooni , idxArr)
    while(idxArr.length !== 0){
        const me = dawooni.pop()
        let isTrue = true
        while(isTrue){
            const [c,i] = idxArr.shift()
            if(c !== me){
                idxArr.push([c,i])
            } else {
                isTrue = false;
                cnt++;
                if(i === location){
                    return cnt; 
                }
            }    
        }
         
    }
    return ;
}