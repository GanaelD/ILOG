package tp_thread;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExecutorTest {
	public static void main(String[] args) {
		ExecutorService ex = Executors.newCachedThreadPool();
		Future<String> date = ex.submit(new Watch("localhost"));
		ex.shutdown();
		try {
			System.out.println(date.get());
		} catch (InterruptedException | ExecutionException e) {
			e.printStackTrace();
		}
	}
}