function solution(cipher, code) {
    var answer = '';
    [...cipher].map((c,i)=> {
        if((i+1)%code === 0){
      answer += c  
    }} );
    return answer;
}