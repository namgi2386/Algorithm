import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 1; i < N+1; i++) {
            queue.add(i);
        }
        while (queue.size() > 1) {
            queue.pollFirst();
            queue.addLast(queue.pollFirst());
        }
        bw.write(queue.peek() + "\n");
        bw.flush();
        bw.close();
    }
}
