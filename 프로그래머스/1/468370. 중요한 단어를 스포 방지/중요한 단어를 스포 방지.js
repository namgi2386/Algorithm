function solution(message, spoiler_ranges) {
    // 단어, 시작/끝위치, 가림여부
    // 단어 별 가림수를 체크
    const N = message.length
    const M = spoiler_ranges.length
    let arrIdx = 1
    const arr = new Array(N).fill(0) // 문자자리별 번호
    const map = new Map() // 번호 : 단어
    for(let i = 0 ; i < N;i++){
        const w = message[i]
        if(w===" "){
            arrIdx++
            continue
        }
        arr[i] = arrIdx
    }
    message.split(' ').map((c,i) => {
        map.set(i+1 , c)
    })
    const cnts = new Array(map.size +1).fill(0) // 번호별 가림수 
    const spoilers = Array.from({length: M}, () => [])
    for(let t = 0 ; t < M; t++){
        const [a,b] = spoiler_ranges[t]
        let tempIdx = 0
        for(let i = a ; i<=b;i++){
            const idx = arr[i]
            if(idx === 0) continue
            if(idx === tempIdx) continue
            tempIdx = idx
            cnts[idx]++
            spoilers[t].push(idx)
        }
    }
    let answer = 0
    const publicWords = new Set()
    for(let i = 1 ; i < map.size +1; i++){
        if(cnts[i] === 0){
            publicWords.add(map.get(i))
        }
    }
    // console.log(publicWords , spoilers, cnts)
    for(let i = 0 ; i< M ; i++){
        for(const num of spoilers[i]){
            cnts[num]--
            if(cnts[num] === 0){
                if(!publicWords.has(map.get(num)))
                answer++
                publicWords.add(map.get(num))
            }
        }
    }
    return answer;
}