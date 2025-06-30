function solution(polynomial) {
    // const polynomial = "x + 2x + 22x + 1 + 11 + 121"
    // const polynomial = 'x + 3 + 4'
    let xNum = 0;
    let iNum = 0;
    polynomial.split(' + ').map((c,i) => {
        // console.log(c , c.length , c[0])
        if(c.includes('x')){
            if(c.length === 1){
                xNum += 1;
            } else if(c.length === 2) {
                xNum += Number(c[0]);
            } else {
                const len = c.length
                xNum += Number(c.slice(0,len-1));
                console.log(c.slice(0,len-1))
            }
            console.log(c  , xNum);
        } else {
            iNum += Number(c);
        };
    });
    if(xNum === 0){
       return iNum.toString();
    } else if(iNum === 0){
        if(xNum === 1){
            return 'x'
        };
        return `${xNum}x`
    } else {
        if(xNum === 1){
            return `x + ${iNum}`
        }
        return `${xNum}x + ${iNum}`
    };
};