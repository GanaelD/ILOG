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
	protected Double o3, o4, o5;
	protected Fifo fifo;
	protected FifoHead fifoHead;
	protected FifoQueue fifoQueue;
	@Rule
	public TestName namTest = new TestName();

	/**
	 * Build objects useful to the test.
	 */
	@Before
	public void setUp() {
		o3 = 3.;
		o4 = 4.;
		o5 = 5.;
		fifo = new Fifo();
		fifoHead = fifo;
		fifoQueue = fifo;
		System.out.println(namTest.getMethodName());
	}

	// helper methods

	/**
	 * Check the Fifo state : size and head signal.
	 * 
	 * @param size    The expected size.
	 * @param headExp The expected signa.
	 */
	protected void checkState(int size, Object headExp) {
		assertEquals(size, fifo.getSize());
		Object head = fifo.getHead();
		if (headExp instanceof Integer)
			assertEquals(headExp, head);
		else
			assertSame(headExp, head);
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
	 * Remove n signals from the Fifo.
	 * 
	 * @param n The number of signals to remove.
	 */
	protected void remove(int n) {
		for (int i = 0; i < n; i++)
			fifoHead.remove();
	}

	// test methods
	@Test
	public void testInitiallyEmpty() {
		checkState(0, null);
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
		fifoQueue.add(null);
		assertEquals(0, fifoHead.getSize());
	}

	@Test
	public void testAddObjects() {
		fill(o5, o4, o3);
		checkState(3, o5);
	}

	@Test
	public void testAddInts() {
		fill(5, 4, 3);
		checkState(3, 5);
	}

	@Test
	public void testRemoveObject() {
		fill(o5, o4, o3);
		remove(1);
		checkState(2, o4);
	}

	@Test
	public void testRemoveInt() {
		fill(5, 4, 3);
		remove(1);
		checkState(2, 4);
	}

	@Test
	public void testAddRemove() {
		fill(5, o4, 3);
		remove(3);
		checkState(0, null);
	}

	@Test
	public void testSaveObjects() {
		fill(o5, o4, o3, 4, 5, 5);
		fifoHead.save(Double.class);
		checkState(3, 4);
	}

	@Test
	public void testSaveInts() {
		fill(3, 3, 3, o3, o4, o5);
		fifoHead.save(3);
		checkState(3, o3);
	}

	@Test
	public void testAllSavedObjects() {
		fill(o5, o4, o3);
		fifoHead.save(Double.class);
		checkState(0, null);
	}

	@Test
	public void testAllSavedInts() {
		fill(3, 3, 3);
		fifoHead.save(3);
		checkState(0, null);
	}

	@Test
	public void testSizeResetSaved() {
		fill(o5, o4, o3, 4, 5, 5);
		fifoHead.save(Double.class);
		// reset savings
		fifoHead.save(null);
		checkState(6, o5);
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