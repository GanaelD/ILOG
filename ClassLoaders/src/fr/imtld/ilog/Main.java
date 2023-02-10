package fr.imtld.ilog;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) throws Exception {
		new Main().exec(args);
	}

	public static void displayClassLoader(Class<?> cls) {
		ClassLoader cl = cls.getClassLoader();
		String str = cl == null ? "bootstrap class loader" : cl.getClass().getCanonicalName();
		System.out.println(str);
	}

	public void exec(String[] args) throws Exception {
		Scanner sc = new Scanner(System.in);
		String qname = sc.next();
		Class<?> cls = Class.forName(qname);
		displayClassLoader(cls);
		String nameClass = cls.getCanonicalName();
		System.out.println(nameClass);
		sc.close();
	}

}
