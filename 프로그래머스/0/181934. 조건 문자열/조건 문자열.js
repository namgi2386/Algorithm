
function solution(ineq, eq, n, m) {
    
    const op = ineq + eq;
    let answer = 1;
    switch(op){
         case ">=":
            answer = n >= m;
            break;
        case ">!":
            answer = n > m;
            break;
        case "<=":
            answer = n <= m;
            break;
        case "<!":
            answer = n < m;
            break;
        default:
            break;           
    }
    
    return answer ? 1: 0;
}