function solution(k, m, score) {
    const arr = score.sort((a,b)=> b-a)
    let answer = 0
    for(let i = m-1 ; i<score.length ; i = i+m){
        answer += arr[i]
    }
    return answer * m;
}
// 	[4, 1, 2, 2, 4, 4, 4, 4, 1, 2, 4, 2]
// 444 444 222 211
// 4 4 2 1
// 11 * 3