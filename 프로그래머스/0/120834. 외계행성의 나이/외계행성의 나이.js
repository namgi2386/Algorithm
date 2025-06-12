function solution(age) {
    var answer = '';
    const numToStrs = ['a','b','c','d','e','f','g','h','i','j'];
    age.toString().split('').forEach(c => {
        answer += numToStrs[Number(c)]
    })
    return answer;
}