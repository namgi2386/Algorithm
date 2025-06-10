function solution(my_string) {
    return [...my_string].map(c => {
        if(c == c.toLowerCase()){
            return c.toUpperCase();
        } else {
            return c.toLowerCase();
        }
    }).join('');
}