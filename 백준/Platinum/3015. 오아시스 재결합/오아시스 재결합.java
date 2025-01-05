
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
        Stack<Long[]> stack = new Stack<>();
        long result = 0;
        for (int i = 0; i < N; i++) {
            long n = Long.parseLong(br.readLine());
            while (!stack.isEmpty()){
                if (stack.peek()[0] < n ){
                    stack.pop();
                    result++;
//                    bw.write(result + "no1\n");
                } else if (stack.peek()[0] == n) {
                    long temp = stack.peek()[1];
                    result += temp+1;
                    stack.push(new Long[]{n, temp+1});
//                    bw.write(result + "no2\n");
                    break;
                } else {
                    result ++;
                    stack.push(new Long[]{n, 1L});
//                    bw.write(result + "no3\n");
                    break;
                }

            }
            if (stack.isEmpty()){
                stack.push(new Long[]{n, 0L});
            }
//            for (int j = 0; j < stack.size(); j++) {
//                bw.write("[" + Long.toString(stack.get(j)[0]) + " "+ Long.toString(stack.get(j)[1]) + "], " );
//            }
//            bw.write("\n");
        }
        bw.write(Long.toString(result));
    }
}
