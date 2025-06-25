function solution(array, n) {
    let diff = 101;
    let answer = array[0];
    const a = array.map(num => {
        const tempNum = Math.abs(num-n);
        if ( tempNum < diff ) {
            diff = tempNum;
            answer = num;
        }else if( tempNum === diff){
            answer = Math.min(answer , num);
        };
    });
    return answer;
}