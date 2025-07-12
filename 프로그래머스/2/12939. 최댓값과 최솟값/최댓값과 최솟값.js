function solution(s) {
    const arr = s.split(' ').map(c=>Number(c)).sort((a,b)=>a-b);
    var answer = arr[0] + ' ' + arr[arr.length - 1];
    return answer;
}