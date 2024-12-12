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
        for (int i = 0; i < N; i++) {
            bw.write(" ".repeat(N-i-1)+"*".repeat((i+1)*2-1)+"\n");
        }
        for (int i = N-1; i >0; i--) {
            bw.write(" ".repeat(N-i) + "*".repeat(i*2 -1)+ "\n");
        }
        // 코드 끝
    }

}
