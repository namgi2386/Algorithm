
import java.io.*;
import java.util.StringTokenizer;

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
        int N = Integer.parseInt(br.readLine());
        for (int j = 0; j < N; j++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            String st1 = st.nextToken();
            String st2 = st.nextToken();
            int[] arr = new int[26];
            for (char stt : st1.toCharArray()) {
                arr[stt - 'a']++;
            }
            for (char stt : st2.toCharArray()) {
                arr[stt - 'a']--;
            }
            String result = "Possible";
            for (int i = 0; i < 26; i++) {
                if (arr[i] != 0){
                    result = "Impossible";
                }
            }
            bw.write(result + "\n");
        }
    }
}
