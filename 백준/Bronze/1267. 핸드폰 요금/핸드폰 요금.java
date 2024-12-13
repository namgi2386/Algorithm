

import java.io.*;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        //BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int Y = 0;
        int M = 0;
        for (int i = 0; i < N;  i++) {
            int S = Integer.parseInt(st.nextToken());
            Y += (S/30 +1)*10;
            M += (S/60 +1)*15;
        }
        String re_s = "Y";
        String re_n = Integer.toString(Y);
        if (Y > M){
            re_s = "M";
            re_n = Integer.toString(M);
        } else if (Y==M) {
            re_s = "Y M";
        }
        bw.write(re_s +" " +re_n);


        bw.flush();
        bw.close();
        br.close();
    }
}
