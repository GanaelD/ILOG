package fr.imtld.ilog;

/**
 * The head end of an SDL fifo. A Fifo stores signals implemented by small
 * classes or int values (if no signal parameters and signal sender is not
 * important). Compared with a regular Fifo, head signals of a specified kind
 * may be saved -for a future use- so that following signals are accessible
 * instead. Use {@link #save(Class)} or {@link #save(int)} to save class or int
 * signals. Savings remain until they are reset with #save(null).
 *
 * @author Christophe TOMBELLE
 */
public interface FifoHead {
	/**
	 * Get the number of accessible (not saved) signals.
	 * 
	 * @return The number of accessible signals.
	 */
	int getSize();

	/**
	 * Remove the signal from the fifo head.
	 */
	void remove();

	/**
	 * Get the signal at the fifo head. Doesn't remove the signal from the fifo.
	 * 
	 * @return The signal at the fifo head.
	 */
	Object getHead();

	/**
	 * Save head signals of the specified class. Modifies the position of the fifo
	 * head.
	 * 
	 * @param clsSig Class of the signals to save, null to reset previous savings.
	 */
	void save(Class<?> clsSig);

	/**
	 * Save head Integer signals of the specified value. Modifies the position of
	 * the fifo head.
	 * 
	 * @param iSig The value for Integer signals to save.
	 */
	void save(int iSig);
}
