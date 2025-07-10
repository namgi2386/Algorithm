function solution(s){
    let answer = 0
    console.log()
    s.toUpperCase().split('').map(c=> c==='P'? answer++ : c==='Y' ? answer-- : '' )
    return !answer;
}