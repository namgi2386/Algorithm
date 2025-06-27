function solution(spell, dic) {
    let answer = 2;
    const s = spell.sort().join('')
    for(c of dic){
        if (c.split('').sort().join('') === s){
            answer = 1;
        };
    };
    return answer;
}