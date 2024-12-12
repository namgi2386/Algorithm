

import java.io.*;

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
        int result = 1;
        for (int i = 0; i < 3; i++) {
            int a = Integer.parseInt(br.readLine());
            result *= a;
        }
        String result_st = Integer.toString(result);
        int arr[] = new int[11];
        for(char c : result_st.toCharArray()){
            arr[c- '0']++;
        }
        for (int i = 0; i < 10; i++) {
            bw.write(Integer.toString(arr[i])+"\n");
        }
    }
}
