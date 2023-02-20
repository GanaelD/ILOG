package tp_thread;

public class Producer implements Runnable{
	
	protected Fifo fifo;
	
	public Producer(Fifo fifo) {
		this.fifo = fifo;
	}
	
	@Override
	public void run() {
		for (int i = 0; i < 100; i++) {
			fifo.append(i);
	    }
	    System.err.println("Producer ended");
	  }

}
