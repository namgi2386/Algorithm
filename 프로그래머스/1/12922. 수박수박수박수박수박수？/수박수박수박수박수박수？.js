function solution(n) {
    const half = Math.floor(n/2)
    const remain = n%2 ? "수" : ""    
    return "수박".repeat(half) + remain;
}