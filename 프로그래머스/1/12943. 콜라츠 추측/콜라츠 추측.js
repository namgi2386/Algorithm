function solution(primeNum) {
    function fnc(num,cnt){
        if(num === 1) return cnt
        if(cnt >= 500) return -1
        if(num%2){
            return fnc(num*3 +1 , ++cnt)
        } else {
            return fnc(Math.floor(num/2), ++cnt)
        }
    }
    return fnc(primeNum , 0);
}