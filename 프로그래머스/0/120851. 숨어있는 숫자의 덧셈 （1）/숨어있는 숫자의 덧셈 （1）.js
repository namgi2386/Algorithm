function solution(my_string) {
    const arr = my_string.match(/[0-9]/g);
    let a = 0;
    arr.map(c => a+=Number(c));
    return a;
}