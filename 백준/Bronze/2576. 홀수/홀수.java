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
        int minodd = 1000;
        int sumodd = 0;
        for (int i = 0; i < 7; i++) {
            int a = Integer.parseInt(br.readLine());
            if (a%2==1){
                sumodd += a;
                if (a < minodd){
                    minodd = a;
                }
            }
        }
        if (sumodd != 0){
        bw.write(sumodd + "\n");
        bw.write(minodd + "\n");
        } else {
            bw.write("-1");
        }
    }
}
