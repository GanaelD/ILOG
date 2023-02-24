package tp_generics;

public class PrioritizedQueue<T extends Comparable<T>> extends Queue<T> {
	
	@Override
	public void enqueue(T elt) {
		if (queue.size() == 0)
			queue.add(elt);
		else {
			int idx = 0;
			int size = queue.size();
			while(idx < size && elt.compareTo(queue.get(idx)) < 0)
				idx++;
			queue.add(idx, elt);
		}
	}
}