function solution(s, n) {
    const a = "abcdefghijklmnopqrstuvwxyz"
    return s.split('').map(c=> {
        if(c === ' '){
            return c
        } else if(/^[a-z]$/.test(c)){
            return a[(a.indexOf(c) + n)%26]
        } else {
            const d = c.toLowerCase()
            return a[(a.indexOf(d) + n)%26].toUpperCase()
        }
    }).join('')
}