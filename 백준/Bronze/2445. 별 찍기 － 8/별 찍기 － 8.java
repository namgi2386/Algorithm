
import java.io.*;

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
        // 코드작성
        int N = Integer.parseInt(br.readLine());
        for (int i = 1; i < N+1; i++) {
            bw.write("*".repeat(i) + " ".repeat(N*2-2*i) + "*".repeat(i) +"\n");
        }
        for (int i = N-1; i >0; i--) {
            bw.write("*".repeat(i) + " ".repeat(2*N -2*i)+"*".repeat(i)+ "\n");
        }
        // 코드 끝
    }

}
