function solution(s){
    let stack = [];
    for(c of [...s]){
        if(c==='('){
            stack.push(c);
        } else {
            if(!stack.length)return false;
            stack.pop();
        }
    }
    if(stack.length)return false;

    return true;
}