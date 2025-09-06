function solution(n) {
    const bin = n.toString(2)
    let oneStart = false
    let oneEnd = -1
    let arr = bin.split('').reverse()
    for(let i =0;i< arr.length ; i++) {
        if(arr[i]=== '1' && !oneStart){
            oneStart = true
        } else if (arr[i]=== '0' && oneStart){
            oneEnd = arr.length - i - 1
            break;
        }
    }
    let FrontAnswerArr = oneEnd !== -1 ? bin.split('').slice(0,oneEnd) : []
    let BackAnswerArr = bin.split('').slice(oneEnd +2).reverse()
    // BackAnswerArr.pop()
    return parseInt(FrontAnswerArr.concat(['1','0']).concat(BackAnswerArr).join(''),2)
}
