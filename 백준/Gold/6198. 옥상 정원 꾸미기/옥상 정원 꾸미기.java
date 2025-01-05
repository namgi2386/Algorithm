import java.io.*;
import java.util.Stack;

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
        // 입력받기
        // stack에 입력받은 놈보다 낮은애들 pop
        // 높은애 찾으면 그애들 1점추가
        int N = Integer.parseInt(br.readLine());
        Stack<int[]> stack = new Stack<>();
        long result = 0;
        for (int i = 0; i < N; i++) {
            int n = Integer.parseInt(br.readLine());
            while (!stack.isEmpty()){
                if (stack.peek()[1] <= n){
                    stack.pop();
                } else {
                    result += stack.size();
                    break;
                }
            }
            stack.push(new int[]{i , n});
        }
        bw.write(Long.toString(result));
    }
}
