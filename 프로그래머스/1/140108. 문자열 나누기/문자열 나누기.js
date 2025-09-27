function solution(s) {
    let arr = s.split('')
    let a = "init"
    let cnt = 1
    let ccnt = 0
    let answer = 0
    for(let i=0; i< arr.length;i++){
        if(a === "init") a = arr[i]
        else{
            if(a === arr[i]) cnt++
            else ccnt++
            if(cnt === ccnt) {
                answer++
                a = 'init'
                cnt = 1
                ccnt = 0
            } 
        }
    }
    if(a !== 'init') answer++
    return answer
}