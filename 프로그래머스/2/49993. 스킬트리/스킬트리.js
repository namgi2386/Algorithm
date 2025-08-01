function solution(skill, skill_trees) {
    const len = skill_trees.length;
    const slen = skill.length;
    let answer = 0;
    for(let i=0;i<len;i++){
        const str = skill_trees[i];
        let temp = -1
        let isgood = true
        let isfalsed = false
        for(let j=0;j<slen;j++){
            const idx = [...str].indexOf(skill[j])
            // console.log(str , skill[j], idx , temp )
            if(idx !== -1 && temp < idx) {
                if(isfalsed) {
                    isgood = false
                    break
                }
                temp = idx;
            } else if (idx !== -1 && temp > idx){
                // console.log(str , skill[j], idx , temp , '?')
                isgood = false
                break;
            } else {
                isfalsed = true;
            }
        }
        if(isgood) {
            // console.log(str)
            answer++;
        }
    }
    return answer;
}