function solution(numbers) {
    // const arr = ['one', 'two','three','four','five','six','seven','eight','nine'];
    const jso = {
        'ze' : [0,4],
        'on' : [1,3],
        'tw' : [2,3],
        'th' : [3,5],
        'fo' : [4,4],
        'fi' : [5,4],
        'si' : [6,3],
        'se' : [7,5],
        'ei' : [8,5],
        'ni' : [9,4]
    }
    let step = 1;
    let answer = '';
    for(let i=0; i<numbers.length; i+=step){
        const t = jso[numbers.slice(i,i+2)];
        answer += t[0];
        step = Number(t[1]);
    }
    return Number(answer);
}