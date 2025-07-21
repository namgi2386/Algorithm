function solution(people, limit) {
    let answer = 0;
    people.sort((a,b)=>a-b);
    const len = people.length
    let e = people.length -1 
    for(let s=0;s<len;s++){
        let sNum = people[s]
        while(s <= e){
            if(sNum + people[e] <= limit){
                answer++;
                e--
                break
            } else {
                answer++;
                e--
            }
        }
        if(s >= e){
            return answer;
        }
    }
    return ;
}

// 10 20 30 35 40 45 60 80 85 90