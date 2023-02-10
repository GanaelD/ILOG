package fr.imtld.ilog;

/**
 * The queue end of a fifo. A Fifo stores signals implemented by small classes
 * or int values (if no signal parameters and signal sender is not important).
 * 
 * @author Christophe TOMBELLE
 */
public interface FifoQueue {
	/**
	 * Append the specified signal instance to this Fifo.
	 * 
	 * @param oSig The signal instance to append, null shouldn't modify fifo state.
	 */
	void add(Object oSig);

	/**
	 * Append the specified signal instance to this Fifo.
	 * 
	 * @param iKind The signal do add.
	 */
	void add(int iKind);
}
