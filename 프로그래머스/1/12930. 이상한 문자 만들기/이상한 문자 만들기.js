function solution(s) {
    return s.split(' ').map(c => {
        return c.split('').map((a,i)=> {
            if(i%2){
                return a.toLowerCase()
            } else {
                return a.toUpperCase()
            }
        }).join('')
    }).join(' ')
}