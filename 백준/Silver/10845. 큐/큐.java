
import java.io.*;
import java.util.Deque;
import java.util.LinkedList;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        //BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        solution(br,bw);
        bw.flush();
        bw.close();
        br.close();
    }
    static void solution(BufferedReader br , BufferedWriter bw )throws IOException{
        int N = Integer.parseInt(br.readLine());
        Deque<Integer> queue = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            String commend = st.nextToken();
            switch (commend) {
                case "push":
                    int n = Integer.parseInt(st.nextToken());
                    queue.addLast(n);
                    break;
                case "pop":
                    bw.write(queue.isEmpty() ? "-1\n" : queue.pollFirst() +"\n" );
                    break;
                case "size":
                    bw.write(queue.size() + "\n");
                    break;
                case "empty":
                    bw.write(queue.isEmpty() ? "1\n" : "0\n");
                    break;
                case "front":
                    bw.write(!queue.isEmpty() ? queue.peekFirst()+"\n" : "-1\n");
                    break;
                case "back":
                    bw.write(!queue.isEmpty() ? queue.peekLast()+"\n" : "-1\n");
                    break;
                default:
                    break;
            }
        }
    }
}
