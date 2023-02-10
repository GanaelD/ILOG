package fr.imtld.ilog;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.junit.runner.JUnitCore;

import static org.junit.Assert.*;

/**
 * JUnit test for fr.imtld.ilog.Fifo
 * 
 * @version for JUnit4
 * @author Christophe TOMBELLE
 */
public class FifoTest {
	protected static final Class<?> CANCEL = null;
	protected static final Object NULL_SIG = null;
	protected Double sig3, sig4, sig5;
	protected Fifo fifo;
	protected FifoHead fifoHead;
	protected FifoQueue fifoQueue;
	@Rule
	public TestName namTest = new TestName();

	/**
	 * Builds objects useful to the test.
	 */
	@Before
	public void setUp() {
		sig3 = 3.;
		sig4 = 4.;
		sig5 = 5.;
		fifo = new Fifo();
		fifoHead = fifo;
		fifoQueue = fifo;
		System.out.println(namTest.getMethodName());
	}

	// helper methods

	/**
	 * Check the Fifo state : size and head signal.
	 * 
	 * @param szExp   The expected size.
	 * @param sigExp The expected signal.
	 */
	protected void checkState(int szExp, Object sigExp) {
		assertEquals(szExp, fifo.getSize());
		Object sigHead = fifo.getHead();
		if (sigExp instanceof Integer)
			assertEquals(sigExp, sigHead);
		else
			assertSame(sigExp, sigHead);
	}

	/**
	 * Fill the Fifo with the specified signals.
	 * 
	 * @param signals The signals.
	 */
	protected void fill(Object... signals) {
		for (int i = 0; i < signals.length; i++)
			fifoQueue.add(signals[i]);
	}

	/**
	 * Remove cnt signals from the Fifo.
	 * 
	 * @param cnt The number of signals to remove.
	 */
	protected void remove(int cnt) {
		for (int i = 0; i < cnt; i++)
			fifoHead.remove();
	}

	// test methods

	@Test
	public void testInitiallyEmpty() {
		checkState(0, NULL_SIG);
	}

	@Test
	public void testRemoveEmptyFifo() {
		fifoHead.remove();
	}

	@Test
	public void testSaveEmptyFifo() {
		fifoHead.save(Double.class);
		fifoHead.save(4);
	}

	@Test
	public void testAddNull() {
		fifoQueue.add(NULL_SIG);
		assertEquals(0, fifoHead.getSize());
	}

	@Test
	public void testAddSignals() {
		fill(sig5, sig4, sig3);
		checkState(3, sig5);
	}

	@Test
	public void testAddInts() {
		fill(5, 4, 3);
		checkState(3, 5);
	}

	@Test
	public void testRemoveSig() {
		fill(sig5, sig4, sig3);
		remove(1);
		checkState(2, sig4);
	}

	@Test
	public void testRemoveInt() {
		fill(5, 4, 3);
		remove(1);
		checkState(2, 4);
	}

	@Test
	public void testAddRemove() {
		fill(5, sig4, 3);
		remove(3);
		checkState(0, NULL_SIG);
	}

	@Test
	public void testSaveObjects() {
		fill(sig5, sig4, sig3, 4, 5, 5);
		fifoHead.save(Double.class);
		checkState(3, 4);
	}

	@Test
	public void testSaveInts() {
		fill(3, 3, 3, sig3, sig4, sig5);
		fifoHead.save(3);
		checkState(3, sig3);
	}

	@Test
	public void testSaveAllSignals() {
		fill(sig5, sig4, sig3);
		fifoHead.save(Double.class);
		checkState(0, NULL_SIG);
	}

	@Test
	public void testSaveAllInts() {
		fill(3, 3, 3);
		fifoHead.save(3);
		checkState(0, NULL_SIG);
	}

	@Test
	public void testSizeResetSaved() {
		fill(sig5, sig4, sig3, 4, 5, 5);
		fifoHead.save(Double.class);
		fifoHead.save(CANCEL);
		checkState(6, sig5);
	}

	/**
	 * This test case has a main so that it can be launched as a standalone
	 * application.
	 * 
	 * @param straArgs The command line arguments (unused).
	 */
	public static void main(String[] straArgs) {
		JUnitCore.main("fr.imtld.ilog.FifoTest");
	}
}
