function solution(arr1, arr2) {
    let arr = []
    for(let i=0; i< arr1.length;i++){
        let temp = []
        for(let j=0;j< arr1[0].length; j++){
            let num = 0
            for(let k = 0 ; k <arr1[0].length; k++ ){
                num += arr1[i][k] * arr2[k][j]
            }
            temp.push(num)
        }
        arr.push(temp)
    }
    return arr;
}
function solution(arr1, arr2) {
    let arr = []
    for(let i=0; i< arr1.length;i++){
        let temp = []
        for(let j=0;j< arr2[0].length; j++){
            let num = 0
            for(let k = 0 ; k <arr1[0].length; k++ ){
                num += arr1[i][k] * arr2[k][j]
            }
            temp.push(num)
        }
        arr.push(temp)
    }
    return arr;
}

// let a = [[1, 2, 3], 
//          [4, 5, 6]]  // 2×3 행렬
// let b = [[1, 4], 
//          [2, 5], 
//          [3, 6]]  // 3×2 행렬
// const an = 
// console.log(solution(a,b))