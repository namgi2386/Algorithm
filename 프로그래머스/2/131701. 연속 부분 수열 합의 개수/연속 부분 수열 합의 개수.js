function solution(elements) {
    const total = elements.reduce((a,b)=>a+b);
    let arr = new Array(total).fill(false)
    const len = elements.length
    for(let tiny = len-1; tiny>0;tiny--){
        // tiny = 4 ~ 1
        for(let i=0;i<len;i++){
            const endIdx = tiny+i; 
            const temp = endIdx%len
            let answer = 0;
            if(endIdx > len){
                answer += elements.slice(0, temp).reduce((a,b)=>a+b);
                answer += elements.slice(i,len).reduce((a,b)=>a+b);
                // console.log(answer ,"[0," ,temp,"], [" , i,", ",len,"]" );
            } else {
                answer += elements.slice(i, endIdx).reduce((a,b)=>a+b); 
                // console.log(answer , "[",i,",",endIdx,"]")
            }
            arr[answer -1] = true
        }
    }
    let result = 0;
    for(c of arr){
        if(c) result++
    }
    // console.log('result :' ,result)
    return ++result
}
// 7 9 1 1(cut) 4 => 4
// 79(16) 91(10) 11(2) 14(5) 74(11) => 5
// 791(17) 911(11cut) 114(6) 147(12) 479(20) => 4
// 7911(18) 9114(15) 1147(13) 1479(21) => 3
// 79114(22) => 1

// 1 2 4 5 6. 7 9 10 11 12. 13 15 16 17 18. 20 21 22