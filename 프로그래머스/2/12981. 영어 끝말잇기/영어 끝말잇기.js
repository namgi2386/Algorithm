function solution(n, words) {
    let last = words[0][words[0].length - 1]
    for(let i=1; i<words.length;i++){
        if(words.indexOf(words[i]) !== i || words[i][0] !== last){
            return (i+1)%n ? [(i+1)%n , Math.ceil((i+1)/n)] : [n, Math.ceil((i+1)/n)]
        } else {
            last = words[i][words[i].length - 1]
        }
    }

    return [0,0];
}
