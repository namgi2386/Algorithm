
import java.io.*;
import java.util.LinkedList;
import java.util.ListIterator;
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
        String initstr = br.readLine();
        int M = Integer.parseInt(br.readLine());
        LinkedList<Character> resultarr = new LinkedList<>();
        for(char inits : initstr.toCharArray()){
            resultarr.add(inits);
        }


        ListIterator<Character> iter = resultarr.listIterator(); // 커서기록하기
        while (iter.hasNext()){ // 다음이 있다면
            iter.next(); // 마지막으로 이동
        }

        for (int i = 0; i < M; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            String temp_s = st.nextToken();
            if (temp_s.toCharArray()[0] == 'P'){
                temp_s = st.nextToken();
            }
            char s = temp_s.toCharArray()[0];

            if (s == 'L'){
                if (iter.hasPrevious()){
                    iter.previous();
                }
            } else if (s == 'D') {
                if (iter.hasNext()){
                    iter.next();
                }
            } else if (s == 'B') {
                if (iter.hasPrevious()){
                    iter.previous();
                    iter.remove();
                }
            } else {
                iter.add(s);
            }
        }
        StringBuilder sb = new StringBuilder();
        for (char stt : resultarr) {
            sb.append(stt);
        }
        bw.write(sb.toString() + "\n");
    }
}

