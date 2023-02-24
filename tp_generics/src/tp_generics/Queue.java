package tp_generics;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

public class Queue<T> {
	protected List<T> queue;
	
	public Queue() {
		queue = new ArrayList<>();
	}
	
	public boolean isEmpty() {
		return queue.size() == 0;
	}
	
	public void enqueue(T elt) {
		queue.add(elt);
	}
	
	public T peek() throws Exception {
		if (!isEmpty())
			return queue.get(0);
		else
			throw new Exception("The queue is empty!");
	}
	
	public T dequeue() throws Exception {
		if (!isEmpty()) {
			return queue.remove(0);
		}
		throw new Exception("The queue is empty!");
	}
	
	public void printOn(PrintWriter out) {
		queue.forEach(out::println);
	}
}
