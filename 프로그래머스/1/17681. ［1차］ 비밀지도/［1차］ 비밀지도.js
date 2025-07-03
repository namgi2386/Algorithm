function solution(n, arr1, arr2) {
    let arr3 = [];
    for(let i = 0 ; i<n; i++){
        arr3.push(Number(arr1[i]) | Number(arr2[i]));
    }
    arr3 = arr3.map(c => c.toString(2).split('0').join(' ').split('1').join('#'))
    arr3 = arr3.map(c => {
        let len = n - c.length
        if(len){
            c = ' '.repeat(len) + c
        }
        return c
    })
    return arr3;
}
// 01001
// 11110

// 1010 : 10
// 1001 : 9
// 1000