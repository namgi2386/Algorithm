import java.io.*;
import java.util.StringTokenizer;

import static java.lang.Math.abs;

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
        String st1 = br.readLine();
        String st2 = br.readLine();
        int st1len = st1.length();
        int st2len = st2.length();

        int[] arr = new int[30];

        for (int i = 0; i < st1len; i++) {
            arr[st1.toCharArray()[i] - 'a']++;
        }
        for (int i = 0; i < st2len; i++) {
            arr[st2.toCharArray()[i] - 'a']--;
        }
        int result = 0;
        for (int i = 0; i < arr.length; i++) {
            result += abs(arr[i]);
        }
        bw.write(result + "\n");

    }
}
