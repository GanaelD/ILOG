package fr.imtld.ilog;

import java.util.Scanner;
import fr.imtld.ilog.Message;

public class HelloJava {
	
	public static void main(String[] args) {
		Message message = new Message();
		message.display();
		String msg = new Scanner(System.in).nextLine();
		message.display(msg);
	}
}
