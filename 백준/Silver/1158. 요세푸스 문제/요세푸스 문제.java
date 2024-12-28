
import java.io.*;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int[] arr = new int[N+1];
        for (int i = 0; i < N+1; i++) {
            arr[i] = i+1;
        }
        arr[N] = 1;
        bw.write("<");
        int start = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M-1; j++) {
                start = arr[start]; // 2
            }
            int heresNumber = arr[start]; // 3
            arr[start] = arr[heresNumber];
            bw.write(Integer.toString(heresNumber));
            if (i != N-1){
                bw.write(", ");
            }
        }
        bw.write(">");



        bw.close();
        br.close();
    }
}
