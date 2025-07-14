function solution(numbers) {
    // 숫자를 문자열로 변환
    const answer = numbers
        .map(num => num.toString())
        .sort((a, b) => (b + a) - (a + b))  // 핵심: 이어붙여서 비교
        .join('');
    
    // 모든 수가 0인 경우 처리
    return answer[0] === '0' ? '0' : answer;
}