function solution(my_string) {
    const arr = [...my_string].map(c=> c.toLowerCase());
    const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    return arr.sort((a,b) => abc.indexOf(a)-abc.indexOf(b)).join('');
}