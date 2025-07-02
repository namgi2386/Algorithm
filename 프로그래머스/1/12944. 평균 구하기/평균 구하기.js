function solution(arr) {
    const len = arr.length;
    let answer = arr.reduce((a,b)=>b+a);
    return answer/len;
}