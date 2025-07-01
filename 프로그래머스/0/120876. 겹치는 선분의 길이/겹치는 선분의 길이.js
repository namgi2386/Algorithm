function solution(lines) {
    let map = new Map();
    let answer = 0;
    for(position of lines){
        const s = Number(position[0])
        const e = Number(position[1])
        for(let i = s ; i < e ; i++){
            if(map.has(i)){
                map.delete(i)
                answer++;
            } else {
                map.set(i,true)
            }
        }
    }
    return answer;
}