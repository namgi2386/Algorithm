function solution(my_string) {
    const arr = my_string.split(' ');
    let answer = Number(arr[0]);
    arr.forEach((c,i)=> {
        switch (c) {
            case "+":
                answer += Number(arr[i+1]);
                break;
            case "-":
                answer -= Number(arr[i+1]);
                break;
        }        
    })

    return answer;
}