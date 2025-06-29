function solution(A, B) {
    // let A = "abcabc"
    // let B = "bcabca" 
    if(A===B){
        return 0;
    }
    const title = B[0];
    const tempA = A.split('').reverse().join('');
    console.log('tempA : ' , tempA)
    let count = 1;
    let idx = A.length - count ;
    for(c of tempA){
        console.log(c , title , count , idx)
        if(c === title){
            if(A.slice(idx) + A.slice(0,idx) === B){
                return count;
            }
        }
        count++;
        idx = A.length - count ;
    }
    return -1;
}