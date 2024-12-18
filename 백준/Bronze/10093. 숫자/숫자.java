import java.io.*;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        StringTokenizer st = new StringTokenizer(br.readLine());
        
        long s = Long.parseLong(st.nextToken());
        long e = Long.parseLong(st.nextToken());
        if (s>e){
            long temp = s;
            s = e;
            e = temp;
        }
        if (s == e){
            bw.write("0");
        } else if (e-s == 1) {
            bw.write("0");
        } else {
            long r1 = e-s-1;
            bw.write(Long.toString(r1) + "\n");
            for (long i = s+1; i < e; i++) {
                bw.write(i+" ");
            }
        }

        bw.flush();
        bw.close();
        br.close();
    }
}
