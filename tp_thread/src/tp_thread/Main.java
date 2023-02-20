package tp_thread;

import java.io.IOException;

public class Main {

	public static void main(String[] args) {

		Dialog dialog = new Dialog();
		Thread thr = new Thread(dialog);
		thr.start();
		
		Thread currThr = Thread.currentThread();
		String name = currThr.getName();
		System.out.println("main: " + name);
		
		try {
			System.in.read();
			thr.interrupt();
			thr = new Thread(dialog);
			thr.start();
		}
		catch (IOException e) {
			System.out.println("Unable to interrupt the thread");
		}
		
		System.out.println("End of " + name);
	}

}
