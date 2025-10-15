import java.io.*;
import java.util.*;

public class Main {
    static class State implements Comparable<State> {
        int cost, current, visited;
        
        State(int cost, int current, int visited) {
            this.cost = cost;
            this.current = current;
            this.visited = visited;
        }
        
        @Override
        public int compareTo(State o) {
            return Integer.compare(this.cost, o.cost);
        }
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());
        
        int[][] board = new int[N][N];
        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        
        // 다익스트라 + 비트마스킹
        PriorityQueue<State> pq = new PriorityQueue<>();
        int[][] dist = new int[1 << N][N];
        
        // 초기화
        for (int i = 0; i < (1 << N); i++) {
            Arrays.fill(dist[i], Integer.MAX_VALUE);
        }
        
        int initVisited = 1 << K;
        dist[initVisited][K] = 0;
        pq.offer(new State(0, K, initVisited));
        
        int answer = Integer.MAX_VALUE;
        
        while (!pq.isEmpty()) {
            State cur = pq.poll();
            int cost = cur.cost;
            int current = cur.current;
            int visited = cur.visited;
            
            // 이미 더 좋은 경로로 방문했으면 스킵
            if (dist[visited][current] < cost) continue;
            
            // 모든 행성 방문 완료
            if (visited == (1 << N) - 1) {
                answer = Math.min(answer, cost);
                continue;
            }
            
            // 다음 행성 선택
            for (int next = 0; next < N; next++) {
                int nextVisited = visited | (1 << next);
                int nextCost = cost + board[current][next];
                
                if (dist[nextVisited][next] > nextCost) {
                    dist[nextVisited][next] = nextCost;
                    pq.offer(new State(nextCost, next, nextVisited));
                }
            }
        }
        
        System.out.println(answer);
    }
}