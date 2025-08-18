function solution(name, yearning, photo) {
    let map = new Map()
    for(let i =0 ; i< name.length ; i++){
        map.set(name[i] , yearning[i])
    }
    let answer = []
    for(let i =0 ; i< photo.length ; i++){
        let num = 0
        for(let j=0; j < photo[i].length; j++){
            if(map.has(photo[i][j])){
                num += map.get(photo[i][j])
            }
        }
        answer.push(num)
    }
    return answer;
}