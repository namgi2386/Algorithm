function solution(nums) {
    let set = new Set(nums);
    // console.log(set , [...set].length ,  nums.length)
    return ([...set].length) > (nums.length)/2 ? (nums.length)/2 : ([...set].length) ;
}