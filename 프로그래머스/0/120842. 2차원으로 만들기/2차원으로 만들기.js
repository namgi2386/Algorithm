function solution(num_list, n) {
    var answer = [];
    const num_len = num_list.length;
    for(let i = 0 ; i< num_len; i += n) {
        answer.push(num_list.slice(i,i+n));
    }
    return answer;
}