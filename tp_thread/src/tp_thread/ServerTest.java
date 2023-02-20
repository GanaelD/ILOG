package tp_thread;

import java.io.IOException;

public class ServerTest {

	public static void main(String[] args) {

		Server srv = new Server();
		Thread thr = new Thread(srv);
		thr.start();
		
		Thread currThr = Thread.currentThread();
		String name = currThr.getName();
		System.out.println("main: " + name);
		
		try {
			System.in.read();
			srv.stop();
		}
		catch (IOException e) {
			System.out.println("Unable to interrupt the thread");
		}
		
		System.out.println("End of " + name);
	}

}
