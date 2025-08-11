function solution(phone_number) {
    const len = phone_number.length - 4 
    return [...phone_number].map((c,i) => {
        if(i >=len) return c
        return '*'
    }).join('')
}