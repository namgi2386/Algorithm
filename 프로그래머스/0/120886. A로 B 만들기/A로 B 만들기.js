function solution(before, after) {
    const afters = after.split('').sort().join('');
    const befores = before.split('').sort().join('');
    
    return afters === befores ? 1 : 0;
}