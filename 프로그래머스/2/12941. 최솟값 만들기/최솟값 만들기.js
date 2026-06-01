function solution(A,B){
    A.sort((a,b)=> a-b);
    B.sort((a,b)=> b-a);
    let answer = 0;
    A.map((c,i)=> answer += c *B[i] );
    return answer;
}