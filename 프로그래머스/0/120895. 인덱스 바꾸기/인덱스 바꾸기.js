function solution(my_string, num1, num2) {
    const str1 = my_string[num1];
    const str2 = my_string[num2];
    const arr = my_string.split('');
    arr[num1] = str2;
    arr[num2] = str1;
    
    return arr.join('');
}