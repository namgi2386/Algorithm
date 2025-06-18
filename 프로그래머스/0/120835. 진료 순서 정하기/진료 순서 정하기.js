function solution(emergency) {
    const tempArr = Array.from(emergency);
    let answer = Array.from({length:tempArr.length});
    emergency.sort((a,b) => b-a);
    tempArr.map((n,i) => {
        answer[i] = emergency.indexOf(n)+1
    })
    return answer;
}