function solution(numlist, n) {
    numlist.sort((a,b) => {
        let t = Math.max(a-n,n-a) - Math.max(b-n,n-b)
        return t ? t : b-a
    })
    return numlist;
}