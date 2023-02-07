package fr.imtld.ilog;

public class Display {
	
	static {
	    System.loadLibrary("HelloNative");
	}
	
	public static void main(String[] args) {
		Display hj = new Display();
		hj.displayLine(0, "HelloJNI");
	}

	private native void displayLine(int iLine, String message);
}
