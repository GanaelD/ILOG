package fr.imtld.ilog;

public class Message {
	
	private String dest;

	public Message(String dest) {
		super();
		this.dest = dest;
	}
	
	public Message() {
		this.dest = "Hello";
	}

	public void display() {
		System.out.println(this);
	}

	public void display(String msg) {
		System.out.printf("Hello %s !\n", msg);
	}

	public String toString() {
		return "Hello " + getDest() + " !";
	}

	public String getDest() {
		return dest;
	}
}
