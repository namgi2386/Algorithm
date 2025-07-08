function solution(ingredient) {
    let arr = [];
    let answer = 0;
    for(let num of ingredient){
        // console.log(num , arr.length)
        if(num === 1 && arr.length >= 3 && arr.slice(arr.length-3,arr.length).join('') === '123'){
         
                arr.pop()
                arr.pop()
                arr.pop()
                answer++;
          
        } else {
            arr.push(num)   
        }
    }
    return answer;
}