function solution(array) {
    const tempArray = [...array];
    array.sort((a,b) => b-a);
    const maxNum = array[0]
    const maxIdx = tempArray.indexOf(maxNum);
    return [maxNum , maxIdx];
}