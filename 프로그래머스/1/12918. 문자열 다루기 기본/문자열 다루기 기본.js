function solution(s) {
    const len = s.length 
    if(len ===4 || len ===6){
        const dd = /\d/
        for(let i =0 ; i< s.length ; i ++){
            const temp = dd.test(s[i])
            if(!temp){
                return false
            }
        }
        return true
    }else{
        return false
    }
}