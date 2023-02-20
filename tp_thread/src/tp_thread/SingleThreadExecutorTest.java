package tp_thread;

public class SingleThreadExecutorTest {
	
	public static void main(String[] args) {
		
		SingleThreadExecutor sThrEx = new SingleThreadExecutor();
		
		Runnable r = new Runnable() {
			@Override
			public void run() {
				System.out.println("Hello there!");
			}
		};
		for (int i = 0; i<100; i++)
			sThrEx.execute(r);
		sThrEx.execute(null);
	}
	
}
