package tp_thread;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class MultiWatch {
	
	public static void main(String args[]) {
		
		ExecutorService ex = Executors.newCachedThreadPool();
		
		Watch[] arr = new Watch[100];
		Arrays.fill(arr, new Watch("localhost"));
		List<Watch> list = Arrays.asList(arr);
		
		List<Future<String>> futureList;
		try {
			futureList = ex.invokeAll(list);
			futureList.stream().forEach(t -> {
				try {
					System.out.println(t.get());
				} catch (InterruptedException | ExecutionException e) {
					e.printStackTrace();
				}
			});
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
		ex.shutdown();
	}
}