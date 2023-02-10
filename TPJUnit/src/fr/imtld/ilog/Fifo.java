package fr.imtld.ilog;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Fifo implements FifoHead, FifoQueue{

	protected List<Object> fifo = new ArrayList<>();
	protected int head = 0;
	
	@Override
	public void add(Object oSig) {
		if (oSig != null)
			fifo.add(oSig);
	}

	@Override
	public void add(int iKind) {
		fifo.add(iKind);
	}

	@Override
	public int getSize() {
		return fifo.size() - head;
	}

	@Override
	public void remove() {
		if (getSize() > 0)
			fifo.remove(head);
	}

	@Override
	public Object getHead() {
		if (fifo.size() > 0 && getSize() > 0)
			return fifo.get(head);
		return null;
	}

	@Override
	public void save(Class<?> clsSig) {
		if (clsSig != null) {
			int temp = fifo.stream().skip(head).map(e -> e.getClass() == clsSig).toList().indexOf(false);
			int taille = fifo.size();
			head = temp >= 0 ? temp : taille;
			head = head >= taille ? taille : head;
		} else {
			head = 0;
		}	
	}

	@Override
	public void save(int iSig) {
		head = fifo.stream().skip(head).map(e -> e.equals(iSig)).toList().indexOf(false);
		int taille = fifo.size();
		head = head >= taille ? taille : head;
		head = head >= 0 ? head : taille;
	}

}
