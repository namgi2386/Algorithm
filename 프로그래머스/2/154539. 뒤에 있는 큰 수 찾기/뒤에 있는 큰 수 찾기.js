function solution(numbers) {
    let arr = Array(numbers.length).fill(-1)
    let stack =[]
    for(let i=0; i< numbers.length;i++){
        while(stack.length && numbers[stack[stack.length -1]] < numbers[i]){
            const idx = stack.pop()
            arr[idx] = numbers[i]
        }
        stack.push(i)
    }
    return arr
    // return numbers.map((c,i)=>{
    //     if(i === numbers.length - 1 ) return -1
    //     for(let d=i+1;d<numbers.length;d++){
    //         if(numbers[d]>c) return numbers[d]
    //     }
    //     return -1
    // })
}