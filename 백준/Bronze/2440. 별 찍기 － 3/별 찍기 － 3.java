import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
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
            bw.write("*".repeat(N-i)+"\n");
        }
        // 코드 끝
    }

}
