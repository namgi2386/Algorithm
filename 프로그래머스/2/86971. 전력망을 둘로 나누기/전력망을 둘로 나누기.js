function solution(n, wires) {
    const graph = Array.from({length:n+1}, () => []);
    for(const [a,b] of wires){
        graph[a].push(b)
        graph[b].push(a)
    };
    const visited = new Array(n+1).fill(false);
    let answer = n
    visited[1] = true;
    function dfs(node){
        let totalChildCnt = 1
        for(const next of graph[node]){
            if(visited[next]) continue;
            visited[next] = true;
            const childCnt = dfs(next);
            totalChildCnt += childCnt;
        };
        answer = Math.min(answer , Math.abs( n - 2* totalChildCnt))
        return totalChildCnt; 
    };
    dfs(1);
    return answer
}