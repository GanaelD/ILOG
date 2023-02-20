package tp_thread;

import java.io.IOException;
import java.lang.Thread;
import java.net.ServerSocket;

public class Server implements Runnable {
	
	protected ServerSocket srv;
	
	public void stop() {
		try {
			srv.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void run() {
		
		Thread thrCurr = Thread.currentThread();
		String name = thrCurr.getName();
		try {
			srv = new ServerSocket(2023);
			while (true) {
				srv.accept();
			}
		} catch (IOException e) {
			System.out.println("Exception in " + name);
		}
		System.out.println("End of " + name);
	}

}
