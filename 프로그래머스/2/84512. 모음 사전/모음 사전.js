function solution(word) {
    const tArr = ["A","E","I","O","U"]
    let isDone = false
    let cnt = 0
    const fnc = (str) => {
        if(str.length > 5) {
            cnt--
            return
        }
        if(str === word) {
            isDone = true
            return
        }
        for(let i=0;i<5;i++) {
            if(isDone) return
            cnt++
            fnc(str+tArr[i])
        }
    }
    fnc('')
    return cnt
}