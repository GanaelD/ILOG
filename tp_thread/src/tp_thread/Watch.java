package tp_thread;

import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Scanner;
import java.util.concurrent.Callable;

public class Watch implements Callable<String> {
	
	protected String strServer;
	public Watch(String strServer) {
		this.strServer = strServer;
	}
	@Override
	public String call() throws Exception {
		try {
			InetAddress addr = InetAddress.getByName(strServer);
			Socket sock = new Socket(addr, 2013);
			InputStream is = sock.getInputStream();
			Scanner sc = new Scanner(is);
			String strDateTime = sc.nextLine();
			sc.close();
			sock.close();
			return strDateTime;
	    } catch (UnknownHostException e) {
	    	System.err.println(strServer + " : adresse inconnue");
	    } catch (IOException e) {
	    	System.err.println("Connexion impossible à " + strServer);
	    }
		return null;
	}
}