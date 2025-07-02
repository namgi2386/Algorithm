function solution(numbers) {
    let set = new Set();
    for(let i = 0 ; i < numbers.length ; i++){
        for(let j =0 ; j <numbers.length ; j++){
            if(i!==j){
                set.add(numbers[i] + numbers[j]);
            }
        }
    }
    return [...set].sort((a,b)=>a-b);
}