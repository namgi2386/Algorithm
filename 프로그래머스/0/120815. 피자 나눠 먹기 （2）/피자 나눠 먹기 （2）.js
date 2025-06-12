function solution(n) {
    const pizzas = [2,3];
    let tempNum = n;
    let i = 2;
    if(tempNum % 2 === 0) {
        tempNum = parseInt(tempNum/2);
    };
    if(tempNum % 3 === 0) {
        tempNum = parseInt(tempNum/3);  
    };
    return tempNum;
}

// 최소공배수
// 6 28 => 2*3 , 2*2*7 => 2237 14 84
// 소인수분해
// a에 있는 약수들 answer에 추가
// a b 중복약수 제거 
// 남은 b약수 answer에 추가