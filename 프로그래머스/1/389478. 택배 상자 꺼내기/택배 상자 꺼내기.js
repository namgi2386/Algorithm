function solution(n, w, num) {
    let arr = new Array(n+1).fill(0)
    let cnt = 1;
    let up = true;
    for(let i =1 ; i < n+1;i++){
        arr[i] = cnt;
        if(cnt === w && up === true){
            up = false
            continue;
        } else if (cnt === 1 && up === false) {
            up = true
            continue;
        }
        if(up){
            cnt++;
        } else {
            cnt--
        }
    }
    const myNum = arr[num];
    let answer = 0;
    for(let i = num ; i< arr.length +1;i++){
        if(arr[i] === myNum) answer++
    }
    return answer;
}
// 13
// 12 11 10
// 789
// 654
// 123