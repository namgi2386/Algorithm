function solution(n)
{
    let answer = 0;
    const ns = ''+n
    let arr = ns.split('').map(c => Number(c));
    arr.forEach(c => answer += c);
    // const arr = n.split('');
   
    // arr.forEach(c , answer += c);
    return answer;
}