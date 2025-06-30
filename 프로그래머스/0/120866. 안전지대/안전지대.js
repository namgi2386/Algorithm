function isValid(nr,nc, len){
    return 0<=nr && nr <len && 0<=nc && nc<len;
};

function solution(board) {
    const len = board.length;
    let arr = Array.from({length:len},(_,i)=>Array.from({length:len} , (_,j)=> 0));
    board.forEach((ar,i)=>{
        ar.forEach((c,j) =>{
            // console.log(i,j,c)
            if(c){
                for(let nr = i-1; nr<=i+1;nr++ ){
                    for(let nc = j-1; nc<=j+1;nc++){
                        // console.log(i,j,c , nr,nc)
                        if(isValid(nr,nc,len)){
                            // console.log(nr,nc,arr[nr][nc])
                            arr[nr][nc] = 1
                            // console.log(nr,nc,arr[nr][nc])
                        };
                    }
                }
            }
        })
    })
    console.log(arr)
    let answer = 0;
    let notAnswer = 0;
    arr.forEach((ar,i)=> {
        ar.forEach((c,j) => {
            c ? answer++ : notAnswer++
        })
    })
    return notAnswer;
}