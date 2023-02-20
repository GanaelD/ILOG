package tp_thread;

import java.lang.Thread;

public class Dialog implements Runnable {

	@Override
	public void run() {
		
		Thread thrCurr = Thread.currentThread();
		while (!thrCurr.isInterrupted())
			System.out.println("run " + Thread.currentThread().getName());
		
		System.out.println("End of " + thrCurr.getName());
	}

}
