function solution(s) {
    const len = s.length
    if(len%2){
        return s[Math.floor((len-1)/2)]
    }else{
        return s.slice(Math.floor((len/2)-1),Math.floor((len/2)+1))
    }
    var answer = '';
    return answer;
}