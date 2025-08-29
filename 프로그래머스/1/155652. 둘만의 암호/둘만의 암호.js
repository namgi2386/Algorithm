function solution(s, skip, index) {
    const en = "abcdefghijklmnopqrstuvwxyz".split('').filter(c => skip.includes(c) ? '' : c)
    return s.split('').map(c=>en[(en.indexOf(c) + index)%(26 - skip.length)]).join('')
}