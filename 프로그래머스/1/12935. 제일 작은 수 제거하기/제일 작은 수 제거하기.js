function solution(arr) {
    if(arr.length === 1 ) return [-1]
    let idx = 0
    let num = arr[0]
    for(let i =0 ; i< arr.length ; i++) {
        if(arr[i] < num){
            idx = i
            num = arr[i]
        }
    }
    return arr.slice(0,idx).concat(
        arr.slice(idx+1)
    )
}