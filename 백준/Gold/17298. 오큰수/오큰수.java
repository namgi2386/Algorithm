
import java.io.*;
import java.util.Stack;
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
        Stack<int[]> stack = new Stack<>();
        StringTokenizer st = new StringTokenizer(br.readLine());
        int[] result = new int[N];
        for (int i = 0; i < N; i++) {
            // 하나뽑기
            // 스택에 있는값이 이거보다 작으면 pop해서 그 인덱스에 n 값 넣기 반복
            // 아니면 스택에 넣기
            // 다끝나고 안채워진 값은 -1
            int n = Integer.parseInt(st.nextToken());
            while (!stack.isEmpty()){
                if (stack.peek()[1] < n){
                    int[] temp = stack.pop();
                    result[temp[0]] = n;
                } else {
                    stack.push(new int[]{i , n});
                    break;
                }
            }
            if (stack.isEmpty()){
                stack.push(new int[]{i , n});
            }
        }
        for (int i = 0; i < N; i++) {
            if (result[i] == 0){
                bw.write("-1 ");
            } else {
                bw.write(Integer.toString(result[i]) + " ");
            }
        }
    }
}
