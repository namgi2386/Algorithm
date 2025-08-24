function solution(arr1, arr2) {
    const R = arr1.length
    const C = arr1[0].length
    let arr = []
    for(let i=0; i < R; i++){
        let temp = []
        for(let j=0; j < C; j++){
            temp.push(arr1[i][j] + arr2[i][j])
        }
        arr.push(temp)
    }
    return arr;
}