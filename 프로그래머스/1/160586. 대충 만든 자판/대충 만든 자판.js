function solution(keymap, targets) {
    let map = new Map();
    for(let idx=0; idx < keymap.length; idx++){
        const st = keymap[idx]
        for(let i = st.length-1 ; i >=0;i--){
            // console.log(i , [...map])
            let temp = 0;
             if(map.has(st[i])){
                // console.log('1: ', map.get(st[i]))
                if(map.get(st[i]) > i+1){
                    temp = i+1
                } else {
                    temp =  map.get(st[i])
                };
            } else {
                // console.log('1: ', map.get(st[i]))
                temp = i+1
            };           
            map.set(st[i] , temp);
        };
    };
    console.log([...map])
    let answer = [];
    for(let i =0; i<targets.length;i++){
        let an = 0;
        for(let j =0; j<targets[i].length;j++){
            let a = map.get(targets[i][j])
            if(a){
                an += Number(a)
            }else{
                an = -1
                break
            }
        };
        answer.push(an);
    }
    return answer;
}