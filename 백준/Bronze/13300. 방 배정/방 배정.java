import java.io.*;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        //BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        int[] arr_boy = new int[6];
        int[] arr_girl = new int[6];
        for (int i = 0; i < N; i++) {
            StringTokenizer student_st = new StringTokenizer(br.readLine());
            int zen = Integer.parseInt(student_st.nextToken());
            int grd = Integer.parseInt(student_st.nextToken());
            if (zen==1){
                arr_boy[grd-1]++;
            } else {
                arr_girl[grd-1]++;
            }
        }
        int result = 0;
        for (int i : arr_boy){
            int temp = (i+k-1)/k;
            result += temp;
        }
        for (int i : arr_girl){
            int temp = (i+k-1)/k;
            result += temp;
        }
        bw.write(Integer.toString(result));




        bw.flush();
        bw.close();
        br.close();
    }
}
