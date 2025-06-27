let answer = [0,0];
function isDeadlineOfLife(position , myLimit, op){
    if(answer[position] === myLimit){
        return;
    };
    answer[position] += op;
    return;
};
function solution(keyinput, board) {
    const xLimit = (board[0] - 1)/2;
    const yLimit = (board[1] - 1)/2;
    
    for(c of keyinput){
        switch (c) {
            case "left":
                isDeadlineOfLife(0, (-1 *xLimit), -1);
                console.log("l" , answer);
                break;
            case "right":
                isDeadlineOfLife(0, xLimit, 1);
                console.log("r", answer);
                break;
            case "up":
                isDeadlineOfLife(1, yLimit, 1);
                console.log("u", answer);
                break;
            case "down":
                isDeadlineOfLife(1, (-1 *yLimit), -1);
                console.log("d", answer);
                break;
        }
    }
    return answer;
};