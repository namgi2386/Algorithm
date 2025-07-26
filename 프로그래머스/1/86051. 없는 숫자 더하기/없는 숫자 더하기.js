function solution(numbers) {
    let arr = new Array(10).fill(true);
    for(let i =0; i<numbers.length;i++){
        arr[numbers[i]] =false
    }
    let answer = 0;
    arr.map((c,i) => {
        if(c){
            answer += i
        }
    })
    return answer;
}