function solution(s) {
    const answer = s.split(' ').map(c=>{
        let a = c.split('')
        for(let i=0; i<a.length;i++){
            if(/[a-zA-Z]/g.test(a[i])){
                if(i===0){
                    a[i] = a[i].toUpperCase()
                } else {
                    a[i] = a[i].toLowerCase()
                }
            }
        }

        return a.join('')
    }).join(' ')
    
    return answer;
}