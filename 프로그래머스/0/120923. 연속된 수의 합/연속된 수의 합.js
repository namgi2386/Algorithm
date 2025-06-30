function solution(nume, totale) {
    const num = parseInt(nume);
    const total = parseInt(totale);
    let first = 0;
    if(num%2){
        first = (((2*total)/num)-num+1)/2
    }else{
        first = (total/(num/2) - (num - 1) )/2
    }
    const answer = Array.from({length:num},(_,i)=>i+first)
    return answer;
}

// 7 42(12*3+6) = 3456789
// num-1 / 2
// a * ( n-1/2) + a/2 = total
// a ( n/2 ) = total
// a = 2 * total / n => 12
// 2r + n -1 = a 
// r = (a - n + 1) /2
// r = ( (2 * total / n) - n + 1)/2