function solution(array) {
    let arr = new Array(1000).fill(0)
    array.forEach(num => {
        arr[num]++;
    })
    let maxNum = 0;
    let answer = 0;
    arr.forEach((c,i)=>{
        if(maxNum < c){
            maxNum = c;
            answer = i;
            // console.log(maxNum , c , answer , i)
        } else if(maxNum === c){
            answer = -1;
        };
    });
    return answer;
};