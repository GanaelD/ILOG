package fr.imtld.ilog;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Fifo implements FifoHead, FifoQueue{

	protected List<Object> fifo = new ArrayList<>(), oldFifo = new ArrayList<>();
	
	@Override
	public void add(Object oSig) {
		fifo.add(oSig);
	}

	@Override
	public void add(int iKind) {
		fifo.add(iKind);
	}

	@Override
	public int getSize() {
		return fifo.size();
	}

	@Override
	public void remove() {
		fifo.remove(0);
	}

	@Override
	public Object getHead() {
		return fifo.get(0);
	}

	@Override
	public void save(Class<?> clsSig) {
		if (clsSig != null) {
			oldFifo = fifo.stream().filter(e -> e.getClass() != clsSig).toList();
			fifo = fifo.stream().filter(e -> e.getClass() != clsSig).toList();
		} else
			fifo.addAll(oldFifo);
	}

	@Override
	public void save(int iSig) {
		Stream<Object> temp = fifo.stream().filter(e -> !e.getClass().equals(Integer.class));
		save(Integer.class);
		oldFifo = Stream.concat(temp, fifo.stream().filter(e -> !e.equals(iSig))).toList();
		fifo = fifo.stream().filter(e -> e.equals(iSig)).toList();
	}

}
