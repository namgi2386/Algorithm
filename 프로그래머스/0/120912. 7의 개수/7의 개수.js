function solution(array) {
    const st = array.join('').split('')
    let answer = 0;
    st.forEach(c => {
        if(c === '7'){ answer+=1}});
    return answer;
}