function solution(clothes) {
    let map = new Map();
    for(let [_, type] of clothes){
        map.set(type , map.has(type) ? map.get(type) +1 : 1)
    };
    console.log(...map.values())
    let answer = 1
    for(c of [...map.values()]){
        answer *= (c+1);
    }
    return answer -1
}
// a1 a2 x
// b1 x