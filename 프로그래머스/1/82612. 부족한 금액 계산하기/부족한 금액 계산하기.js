function solution(price, money, count) {
    let sum = 0
    for(let i =1 ; i< count+1; i++){
        sum += price*i
    }
    return sum > money ? sum - money : 0;
}
// 3 6 9 12
// 30