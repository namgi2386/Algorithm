function solution(cards) {
    const N  =cards.length;
    const visited = new Array(N +1).fill(false);
    const answers = [];
    for(let i = 1;i < N+1;i++){
        if(visited[i]) continue;
        let idx = 0;
        let node = i;
        while(true){
            const next = cards[node -1]
            if(visited[next]) break;
            visited[next] = true;
            node = next;
            idx++
        };
        // console.log(visited)
        answers.push(idx);
    };
    answers.sort((a,b) => b-a);
    // console.log(answers);
    if(answers.length ===1){
        return 0;
    } else {
        return answers[0] * answers[1];
    };
}
// 1 2 3 4 5 6 7 8
// 8,6,3,7,2,5,1,4

// 1 8 4 7
// 2 6 5
// 3