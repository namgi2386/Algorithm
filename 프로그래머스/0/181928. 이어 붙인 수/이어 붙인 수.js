function solution(num_list) {
    let [odd , even] = [0,0]
    for(const c of num_list){
        if(c % 2 === 0){
            even *= 10
            even += c
        } else {
            odd *= 10
            odd += c
        }
    }
    return odd + even;
}