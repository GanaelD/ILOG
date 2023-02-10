/**
 * 
 */
package fr.imtld.ilog;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;

/**
 * @author Ganaël Delzenne
 *
 */
public class ClockTest {
	
	protected TimeBaseMock tbm;
	protected Clock clock;
	protected long l1, l2, l3;
	
	@Rule
	public TestName testName = new TestName();
	
	
	
	/**
	 * @throws java.lang.Exception
	 */
	@Before
	public void setUp() throws Exception {
		l1 = 1;
		l2 = 6;
		l3 = 1990;
		TimeBaseMock tbm = new TimeBaseMock();
		tbm.setNow(l3);
		clock = new Clock(tbm);
		
		System.out.println("Testing method " + testName.getMethodName());
		
	}

	/**
	 * @throws java.lang.Exception
	 */
	@After
	public void tearDown() throws Exception {
		System.out.println("Finished testing " + testName.getMethodName());
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#now()}.
	 */
	@Test
	public void testNow() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#Clock(fr.imtld.ilog.ITimeBase)}.
	 */
	@Test
	public void testClock() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#getDay()}.
	 */
	@Test
	public void testGetDay() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#getHour()}.
	 */
	@Test
	public void testGetHour() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#getMinute()}.
	 */
	@Test
	public void testGetMinute() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#getSecond()}.
	 */
	@Test
	public void testGetSecond() {
		fail("Not yet implemented");
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#getTime()}.
	 */
	@Test
	public void testGetTime() {
		assertEquals(0, clock.getTime());
	}

	/**
	 * Test method for {@link fr.imtld.ilog.Clock#setTime(int)}.
	 */
	@Test
	public void testSetTime() {
		fail("Not yet implemented");
	}
	
	/**
	 * Test method for {@link fr.imtld.ilog.Clock#setDay(int)}.
	 */
	@Test
	public void testSetDay() {
		fail("Not yet implemented");
	}
	
	/**
	 * Test method for {@link fr.imtld.ilog.Clock#setHour(int)}.
	 */
	@Test
	public void testSetHour() {
		fail("Not yet implemented");
	}
	
	/**
	 * Test method for {@link fr.imtld.ilog.Clock#setMinute(int)}.
	 */
	@Test
	public void testSetMinute() {
		fail("Not yet implemented");
	}

}
