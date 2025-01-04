
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
        int N = Integer.parseInt(br.readLine());
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < N; i++) {
            int n = Integer.parseInt(br.readLine());
            if (n!=0){
                stack.add(n);
            } else {
                stack.pop();
            }
        }
        int result = 0;
        for (int i = 0; i < stack.size(); i++) {
            result += stack.get(i);
        }
        bw.write(Integer.toString(result));
    }
}
