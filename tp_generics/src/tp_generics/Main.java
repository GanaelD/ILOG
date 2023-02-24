package tp_generics;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

public class Main {

	public static void main(String[] args) throws FileNotFoundException {
		Queue<String> queueStr = new Queue<>();
		queueStr.enqueue("Lolilol");
		queueStr.enqueue("Hehehehe!");
		
		PrintWriter fileOut = new PrintWriter(new File("text.txt"));
		queueStr.printOn(fileOut);
		
		PrioritizedQueue<Integer> pq = new PrioritizedQueue<>();
		pq.enqueue(18);
		pq.enqueue(3);
		pq.enqueue(87);
		pq.enqueue(12);
		pq.queue.forEach(System.out::println);
		
		PrioritizedQueue<Task> pqt = new PrioritizedQueue<>();
		pqt.enqueue(new Task(900, "Init"));
		pqt.enqueue(new Task(3, "Little test routine"));
		pqt.enqueue(new Task(49, "Let's break everything down!"));
		
		pqt.queue.forEach(System.out::println);
	}

}
