function solution(array, n) {
    let diff = 101
    let answer = array[0]
    array.map(num => {
        const tempNum = Math.max(num-n , n-num);
        if ( tempNum < diff ) {
            diff = tempNum;
            answer = num
        }else if( tempNum === diff){
            answer = Math.min(answer , num);
        };
        // console.log(num,n,tempNum,diff)
    });
    return answer;
}