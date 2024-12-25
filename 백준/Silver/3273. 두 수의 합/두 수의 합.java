import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());
        int M = Integer.parseInt(br.readLine());
        int[] arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }
        Arrays.sort(arr);
        int result = 0;
        int s = 0;
        int e = N-1;
        while (s < e){
            int temp = arr[s]+arr[e];
            if (temp ==M){
                result++;
                s++;
                e--;
            } else if (temp < M) {
                s++;
            } else {
                e--;
            }
        }
        bw.write(Integer.toString(result));



        bw.flush();
        bw.close();
        br.close();
    }
}
