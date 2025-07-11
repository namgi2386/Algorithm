function solution(x) {
    const div = x.toString().split('').reduce((a,b)=>Number(b)+Number(a) , 0)
    console.log(div)
    return !(x%div);
}