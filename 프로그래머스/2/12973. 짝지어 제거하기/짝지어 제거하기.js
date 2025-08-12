function solution(s){
    let stack = []
    let sIdx = -1;
    for(let i = 0; i < s.length ; i++){
        if(stack.length && stack[sIdx] === s[i]){
            stack.pop();
            sIdx--
        } else {
            stack.push(s[i])
            sIdx++
        }
        // console.log(stack)
    }
    return stack.length ? 0:1;
}