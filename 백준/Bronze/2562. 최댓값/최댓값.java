

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
        int maxnum = 0;
        int maxidx = 1;
        for (int i = 0; i < 9; i++) {
            int a = Integer.parseInt(br.readLine());
            if (a>maxnum){
                maxnum = a;
                maxidx = i+1;
            }
        }
        bw.write(maxnum + "\n");
        bw.write(Integer.toString(maxidx));
        // 코드 끝
    }
}
