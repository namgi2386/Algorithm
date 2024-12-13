

import java.io.*;
import java.util.Arrays;

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
        int arr[] = new int[9];
        int sum_nine = -100;
        for (int i = 0; i < 9; i++) {
            int temp = Integer.parseInt(br.readLine());
            arr[i] = temp;
            sum_nine += temp;
        }

        outerLoop:
        for (int i = 0; i < 8; i++) {
            for (int j = i+1; j < 9; j++) {
                if (arr[i]+arr[j] == sum_nine){
                    arr[i] = -1;
                    arr[j] = -1;
                    break outerLoop;
                }
            }
        }
        Arrays.sort(arr);
        for (int i = 0; i < 9; i++) {
            if (arr[i] != -1){
                bw.write(arr[i] + "\n");
            }
        }
    }
}
