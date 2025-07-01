function solution(dots) {
    const [xs , ys] = dots[0]
    let answer = 0;
    dots.slice(1).forEach(([xe,ye],idx) => {
        if(answer) return;
        const nam = idx === 0 ? [2,3] : idx === 1 ? [1,3] : [1,2]
        const [xe1 , ye1] = dots[nam[0]] 
        const [xe2 , ye2] = dots[nam[1]]
        const dig1 = (ye-ys)/(xe-xs);
        const dig2 = (ye2-ye1)/(xe2-xe1);
        if((ye-ys)/(xe-xs) === (ye2-ye1)/(xe2-xe1)){
            answer = 1;
        }
    })
    return answer;
}