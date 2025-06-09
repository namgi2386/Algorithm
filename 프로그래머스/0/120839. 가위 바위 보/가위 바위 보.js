function solution(rsp) {
    const r = rsp.split('')
    let a = ''
    const b = ['2','0','5']
    r.forEach(c=>{
        const q = (b.indexOf(c)+1) % 3
        a += b[q]
    })
    return a;
}