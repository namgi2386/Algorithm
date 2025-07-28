function solution(x,y) {
    let arr = new Array(11).fill(0)
    const xarr = x.split('').map(c=>Number(c))
    const yarr = y.split('').map(c=>Number(c))
    let result = []
    let temp = false;
    for(c of xarr){
        arr[c]++;
    }
    for(c of yarr){
        if(arr[c]){
            arr[c]--
            result.push(c)
            if(c) temp = true
        }
    }
    if(!result.length) return "-1"
    if(!temp) return "0"
    return result.sort((a,b) => b-a).join('');
}