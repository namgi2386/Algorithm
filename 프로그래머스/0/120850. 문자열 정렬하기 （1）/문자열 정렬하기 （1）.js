function solution(my_string) {
    let answer = [];
    const numlist = [1,2,3,4,5,6,7,8,9,0]
    const r = [...my_string].map(c => {
        if(c in numlist){
            answer.push(Number(c));
        };
    });
    answer.sort()
    return answer;
}