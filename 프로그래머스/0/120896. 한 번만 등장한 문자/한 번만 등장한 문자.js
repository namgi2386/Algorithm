function solution(s) {
    let arr = [];
    let banArr = [];
    // const ss = 'aca'
    for(c of s){
        const temp = arr.indexOf(c); // arr내 idx
        const isBaned = banArr.includes(c); // 중복여부
        if(!isBaned && temp === -1){ // 첫등장
            arr.push(c);
            banArr.push(c);
        } else if(isBaned && temp !== -1){ // 중복이며 arr에 있음  
            // console.log(arr , temp)
            arr.splice(temp,1) // 제거
            // console.log(arr , temp)
        } else if(isBaned && temp === -1){ //중복이며, 이미 제거됨
            //넘어감
        }
    }
    // console.log(arr.sort().join(''));

    return arr.sort().join('');
}