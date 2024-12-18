
import java.io.*;
import java.util.Arrays;
import java.util.List;

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
        int ssum = 0;
        int[] arr = new int[5];
        for (int i = 0; i < 5; i++) {
            int temp = Integer.parseInt(br.readLine());
            arr[i] = temp;
            ssum += temp;
        }
        int r1 = ssum/5;
        Arrays.sort(arr);
        int r2 = arr[2];
        bw.write(r1 + "\n");
        bw.write(r2 + "\n");
    }
}
