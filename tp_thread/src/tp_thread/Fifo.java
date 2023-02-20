package tp_thread;

public class Fifo {
	
	protected Object[] v;
	protected int size;
	
	public Fifo() {
		v = new Object[100];
		size = 0;
	}
	
	public void append(Object o) {
		synchronized (this) {
			v[size] = o;
			System.out.println("size : " + size); // probable scheduling here
			size++;
			if (size == 1)
				notify();
		}
	}
	
	public Object get() {
		synchronized (this) {
			if (size==0) {
				try {
					wait();
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			Object o = v[0];
			size--;
			for (int i=0; i<size; i++)
				v[i] = v[i+1];
			v[size] = null;
			return o;
		}
	}
}
