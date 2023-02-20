package tp_thread;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.text.DateFormat;
import java.util.Date;
import java.util.concurrent.Executor;

public class DayTime implements Runnable {
	protected ServerSocket _sockSvr;
	public static void main(String[] args) {
		DayTime dt = new DayTime();
		dt.serve();
		dt.stop();
	}
	protected void serve() {
		Thread thr = new Thread(this);
		thr.setDaemon(true);
		thr.start();
	}
	protected void stop() {
		System.out.println("Taper entrée pour quitter");
		try {
			System.in.read();
			_sockSvr.close();
		} catch (IOException e) {
		}
	}
	protected void pause(long ms) {
		synchronized (this) {
			try {
				wait(ms);
			} catch (InterruptedException e) {
			}
		}
	}
	@Override
	public void run() {
		try {
			_sockSvr = new ServerSocket(2013);
			DateFormat formater = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG);
			try {
				Executor ex = new FreshThreadExecutor();
				while (true) {
					Socket sock = _sockSvr.accept();
					Runnable r = new Runnable() {
						@Override
						public void run() {
							try {
								String strTime = formater.format(new Date());
								OutputStream os = sock.getOutputStream();
								PrintWriter pw = new PrintWriter(os, true);
								pw.println(strTime);
								pause(1000);  // simule un dialogue plus long
								pw.close();
								sock.close();
							} catch (IOException e) {
							}
						}
					};
					ex.execute(r);
				}
			} catch (IOException e) {
				System.out.println("Interruption du service DayTime");
			}
    	} catch (IOException e) {
    		System.err.println("Port 2013 deja utilise");
    	}
	}
}