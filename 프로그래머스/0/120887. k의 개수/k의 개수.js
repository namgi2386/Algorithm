function solution(i, j, k) {
    let str = "";
    for(let num = i; num <= j; num++) {
        str += num;
    }
    console.log(str.length);
    return str.split('').filter(char => char === k.toString()).length;
}