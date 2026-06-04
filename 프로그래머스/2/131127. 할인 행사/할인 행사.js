function solution(want, number, discount) {
    class Ans {
        constructor(){
            this.sum = 10;
            this.number = number;
            this.answer = 0;
        };
        m(idx){
            this.number[idx]--
            if(this.number[idx] >= 0) this.sum--;
        };
        p(idx){
            this.number[idx]++
            if(this.number[idx] > 0) this.sum++;
        };
        a(){
            if(this.sum === 0) this.answer++;
        };
    };
    const ans = new Ans();
    const idxMap = new Map();
    want.map((c,i)=> idxMap.set(c,i));
    
    for(let i = 0 ; i < 10;i++){
        const idx = idxMap.get(discount[i])
        ans.m(idx);
    };
    ans.a();
    for(let e = 10;e<discount.length;e++){
        ans.p(idxMap.get(discount[e -10]));
        ans.m(idxMap.get(discount[e]));
        ans.a();
    };
    return ans.answer;
};