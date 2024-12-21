
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new FileReader("src/input/z1.txt"));
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        solution(br,bw);
        bw.flush();
        bw.close();
        br.close();
    }
    static void solution(BufferedReader br , BufferedWriter bw )throws IOException{
        String myst = br.readLine();
        int[] arr = new int[26];
        for (char st : myst.toCharArray()){
            arr[st - 'a'] += 1;
        }
        for (int i = 0; i < 26; i++) {
            bw.write(Integer.toString(arr[i]) + " ");
        }
    }
}
