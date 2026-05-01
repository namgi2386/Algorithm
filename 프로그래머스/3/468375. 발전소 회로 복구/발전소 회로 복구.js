// h = 10, n,m = 40 , seqs = 100
// 패널수 pN = 15
// 각 패널부터 엘베까지 비용
// 같은층일때는 A -> B 비용
// 이를 통해 현재패널위치로부터 모든 패널까지의 비용 계산비용은 15

// A 를 켜기 위해 B C D<-E 가 필요하다.
// 현재시점에서 켜야 할 패널은 명확하다.

/*

1번 패널 : 2층 3행 4열 (2)
2번 패널 : 2층 5행 6열 (3)
3번 패널 : 1층 1행 1열 (2)
4번 패널 : 3층 6행 3열 (1) 

4->3->1->2 = [3층출발] (2 + 2 + 7)[1층] + (7 + 1 + 4)[2층] + 6[2층] = 29
4->1->3->2 = [3층출발] (2 + 1 + 4)[2층] + (4 + 1 + 7 + 7)[1층] + (1 + 10)[2층] = 37
4+4 만큼 차이난다. 즉, 가까운순으로 갔을때, 1번패널줍기 왔다갔다를 해야한다.
하지만, 정석방식에서는 2번패널 가는길에 1번 패널을 주울 수 있다.

  / 3 \
4       2   => 4 3 1 2
  \ 1 /
단방향 그래프를 배열로 만들어야 한다.

=> 배낭 DP다

*/


function solution(h, grid, panels, seqs) {
    panels = panels.map(c => c.map(d => d-1));
    seqs = seqs.map(c => c.map(d => d-1));
    const [N ,M] = [grid.length , grid[0].length];
    const [P,Q] = [panels.length , seqs.length];
    const panelToElevatorArr = new Array(P).fill(0);
    let [elevatorR , elevatorC] = [0,0];
    const sameHpanelsCost = Array.from({length:P} , () => new Array(P).fill(0));
    for(let i = 0;i<N;i++){ 
        for(let j = 0; j < M ; j++){
            if(grid[i][j] === "@"){
                [elevatorR , elevatorC] = [i,j];
                break;
            }
        }
    } // 거리구하기
    const dr = [0,0,1,-1];
    const dc = [1,-1,0,0];
    function isValid(r,c){
        return 0 <= r && r<N && 0<= c && c < M;
    };
    function bfs(initR,initC , endR,endC){
        const visited = Array.from({length:N} , () => new Array(M).fill(false))
        const queue = [];
        queue.push([initR,initC , 0]);
        visited[initR][initC] = true
        let idx = 0;
        while(idx < queue.length){
            const [nodeR, nodeC, cost] = queue[idx++];
            for(let d = 0 ; d<4 ; d++){
                const [nr , nc] = [nodeR + dr[d] , nodeC + dc[d]]
                if(!isValid(nr , nc)) continue;
                if(grid[nr][nc] === "#") continue;
                if(nr === endR && endC === nc){
                    return cost +1;
                }
                if(visited[nr][nc]) continue;
                visited[nr][nc] = true;
                queue.push([nr,nc,cost + 1])
            }
            
        }
        return null;
    }
    for(let i = 0; i< P;i++){
        const [ph , pr , pc] = panels[i]
        panelToElevatorArr[i] = bfs(pr,pc , elevatorR , elevatorC);
        // 패널부터 엘베까지 거리저장
        for(let j = i+1;j<P;j++){
            const [nph , npr , npc] = panels[j]
            if(ph === nph){
                // 동일층일때, i패널과 j패널간 거리 구해두기
                const len = bfs(pr, pc , npr , npc)
                sameHpanelsCost[i][j] = len
                sameHpanelsCost[j][i] = len
            } else {
                if(panelToElevatorArr[j] === 0){
                    panelToElevatorArr[j] = bfs(npr,npc , elevatorR , elevatorC)
                }
                const len = panelToElevatorArr[i] + panelToElevatorArr[j] + Math.abs(ph - nph)
                sameHpanelsCost[i][j] = len
                sameHpanelsCost[j][i] = len
            }
        }
    } // sameHpanelsCost 에는 패널간 거리가 2차원배열로 기록되어있다.
    const graph = Array.from({length:P} , () => [])
    const haveTo = Array.from({length:P} , () => new Set())
    for(const [a,b] of seqs){
        graph[a].push(b)
        haveTo[b].add(a)
    };
    let initCanVisit = 0
    for(let i = 0 ; i < P ; i++){
        if(haveTo[i].size === 0){
            initCanVisit += 1 << i
        }
    };
    // const END = (1 << P +1 ) -1
    // graph[e] : e 패널 완료시 on 가능한 패널 번호들
    // haveTo[e] : e 패널 완료를 위해 on 해야하는 패널 번호들
    let answer = (N*M*2 + h)*P
    const gazi = Array.from({length: ((1 << (P + 1)) - 1)}, () => new Array(P).fill(answer))
    function search(canVisit ,visited , cost , prevPalelIdx){
        if(canVisit === 0){
            answer = Math.min(answer , cost)
            return
        };
        for(let i = 0 ; i<P;i++){
            // i = 지금 갈 패널
            const isIcanVisit = (1 << i) & canVisit
            if(isIcanVisit === 0) continue; 
            let nextCanVisit = canVisit
            let nextVisited = visited
            nextVisited += (1 << i);
            for(const next of graph[i]){
                // next = 이동시, 새로 on 되는 패널
                const isNextCanvisit = nextVisited & (1 << next)
                if(isNextCanvisit !== 0) continue; 
                let isNextPossible = true
                for(const child of haveTo[next]){
                    // child = on되기 위한 조건 패널
                    const isChildCanvisit = nextVisited & (1 << child)
                    if(isChildCanvisit === 0){
                        isNextPossible = false
                        break
                    }
                };
                if(isNextPossible){
                    nextCanVisit += (1 << next)
                };
            };
            nextCanVisit -= (1 << i);
            
            const nextCost = sameHpanelsCost[i][prevPalelIdx];
            if(gazi[nextVisited][i] < cost +nextCost ) continue
            gazi[nextVisited][i] = cost +nextCost
            search(nextCanVisit ,nextVisited , cost +nextCost , i );
        }
    }
    search(initCanVisit,0  , 0 , 0)
    
    return answer;
}
/*
  [ 0, 6, 12, 7 ],
  [ 6, 0, 18, 13 ],
  [ 12, 18, 0, 11 ],
  [ 7, 13, 11, 0 ]
*/