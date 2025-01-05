import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int n = Integer.parseInt(br.readLine());
        String[] heights = br.readLine().split(" ");
        int[] result = new int[n];

        Stack<int[]> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            int height = Integer.parseInt(heights[i]);

            // 스택에서 현재 탑보다 낮은 탑을 제거
            while (!stack.isEmpty() && stack.peek()[1] < height) {
                stack.pop();
            }

            // 스택이 비어있지 않으면 수신 가능
            if (!stack.isEmpty()) {
                result[i] = stack.peek()[0] + 1; // 탑 번호 저장 (0-based index 보정)
            } else {
                result[i] = 0; // 수신 가능한 탑이 없을 경우 0
            }

            // 현재 탑을 스택에 추가
            stack.push(new int[]{i, height});
        }

        // 결과 출력
        for (int r : result) {
            bw.write(r + " ");
        }
        bw.flush();
        bw.close();
    }
}
