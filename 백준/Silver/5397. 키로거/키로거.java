
import java.io.*;
import java.util.LinkedList;

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
        for (int tc = 0; tc < N; tc++) {
            String mystr = br.readLine();
            char[] arr = mystr.toCharArray();
            int M = arr.length;
            int idx = 0;
            int maxidx =0;

            LinkedList<Character> resultarr = new LinkedList<>();
            for (int i = 0; i < M; i++) {
                char s = arr[i];
                if (s == '<'){
                    if (idx != 0){
                        idx--;
                    }
                } else if (s == '>') {
                    if (maxidx != idx){
                        idx++;
                    }
                } else if (s == '-') {
                    if (idx != 0){
                        resultarr.remove(idx-1);
                        idx--;
                        maxidx--;
                    }
                } else {
                    resultarr.add(idx,s);
                    idx++;
                    maxidx++;
                }
            }
            StringBuilder sb = new StringBuilder();
            for (char stt : resultarr) {
                sb.append(stt);
            }
            bw.write(sb.toString() + "\n");
        }
    }
}
