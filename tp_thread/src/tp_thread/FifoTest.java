package tp_thread;

public class FifoTest {
	public static void main(String[] args) {
		Fifo fifo = new Fifo();

	    Consumer c = new Consumer(fifo);
	    Thread thrC = new Thread(c);
	    thrC.start();

	    Producer p = new Producer(fifo);
	    Thread thrP = new Thread(p);
	    thrP.start();
	    System.out.println("Primary thread ended");
	  }
}
