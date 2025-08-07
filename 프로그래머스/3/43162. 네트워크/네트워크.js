function solution(n, computers) {
    let answer = 0;
    let visited = Array(n).fill(false);
    const dfs = (index) => {
        visited[index] = true
        for(let i=0;i<n;i++){
            if(computers[index][i] && !visited[i]){
                dfs(i);
            }
        }
    }
    for(let i=0; i<n;i++){
        if(!visited[i]){
            dfs(i);
            answer++;            
        }
    }
    console.log(visited)
    return answer;
}