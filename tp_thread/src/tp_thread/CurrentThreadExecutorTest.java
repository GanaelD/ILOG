package tp_thread;

public class CurrentThreadExecutorTest {

	public static void main(String[] args) {
		CurrentThreadExecutor ex = new CurrentThreadExecutor();
	    Runnable r = new Runnable() {
	    	@Override
	    	public void run() {
	    		System.out.println("Bonjour");
	    	}
	    };
	    for (int i=0; i<100; i++ ) {
	    	ex.execute(r);
	    }
	}

}
