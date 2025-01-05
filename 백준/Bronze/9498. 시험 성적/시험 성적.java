
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
        int N = Integer.parseInt(br.readLine());
        String result = "";
        if (N >=90){
            result = "A";
        } else if (N >= 80) {
            result = "B";
        } else if (N >= 70) {
            result = "C";
        } else if (N >= 60) {
            result = "D";
        }else {
            result = "F";
        }
        bw.write(result);
    }
}
