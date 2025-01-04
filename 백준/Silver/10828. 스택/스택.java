import java.io.*;
import java.util.ArrayList;
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
        int N = Integer.parseInt(br.readLine());
        List<Integer> arr = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            String[] starr = br.readLine().split(" ");
            String command = starr[0];
            switch (command){
                case "push":
                    int num = Integer.parseInt(starr[1]);
                    arr.add(num);
                    break;
                case "top":
                    System.out.println(!arr.isEmpty() ? arr.get((arr.size() - 1)) : "-1");
                    break;
                case "size":
                    System.out.println(arr.size());
                    break;
                case "empty":
                    System.out.println(!arr.isEmpty() ? "0" : "1");
                    break;
                case "pop" :
                    System.out.println(!arr.isEmpty() ? arr.remove((arr.size() - 1)) : "-1");
                    break;
                default:
                    System.out.println("def");
            }
        }
    }
}
