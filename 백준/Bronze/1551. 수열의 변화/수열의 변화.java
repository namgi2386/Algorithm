import java.util.*;
public class Main {
	public static void main(String[] args) {
		Scanner scan = new Scanner(System.in);
		int n = scan.nextInt();
		int m = scan.nextInt();
		
		scan.nextLine();
		String line = scan.nextLine();
		String[] strarr = line.split(",");
		int[] arr = new int[n];
		for (int i = 0; i < n; i++) {
			arr[i] = Integer.parseInt(strarr[i]);
		}
		

		for (int i = 1; i < m+1; i++) {
			for (int j = 0; j < n-i; j++) {
				arr[j] = arr[j+1] - arr[j];
			}
		}
		for (int i = 0; i < n-m-1; i++) {
			
			System.out.print(arr[i]+",");
		}
		System.out.print(arr[n-m-1]);
	}
}
