package tp_thread;

public class FreshThreadExecutorTest {

	public static void main(String[] args) {
		FreshThreadExecutor ex = new FreshThreadExecutor();
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
