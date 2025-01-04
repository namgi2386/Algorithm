import java.io.*;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        // BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        solution(br, bw);
        bw.flush();
        bw.close();
        br.close();
    }

    static void solution(BufferedReader br, BufferedWriter bw) throws IOException {
        int N = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();
        Stack<Integer> stack = new Stack<>();
        int lastN = 1;

        for (int i = 0; i < N; i++) {
            int n = Integer.parseInt(br.readLine());
            // 스택에 값 추가
            while (lastN <= n) {
                stack.push(lastN);
                sb.append("+\n");
                lastN++;
            }

            // 스택에서 값 꺼내기
            if (stack.peek() == n) {
                stack.pop();
                sb.append("-\n");
            } else {
                // 불가능한 수열
                bw.write("NO\n");
                return;
            }
        }
        bw.write(sb.toString());
    }
}
