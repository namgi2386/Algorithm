function solution(number, limit, power) {
    let answer = 0;
    for (let i = 1; i < number+1; i++) {
        let cnt = 0;
        let sqrtNum = Math.sqrt(i)
        for (let j = 1; j <= sqrtNum; j++) {
            if (i % j === 0) {
                cnt += 2
                if (j === sqrtNum) cnt--;
            }
            if (cnt > limit) {
                cnt = power;
                break;
            }
        }
        answer += cnt;
    }
    return answer;
}