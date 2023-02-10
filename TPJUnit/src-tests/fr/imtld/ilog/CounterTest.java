package fr.imtld.ilog;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;

public class CounterTest {
	protected Counter tested;

	@Rule
	public TestName namTest = new TestName();

	@Before
	public void setUp() {
		tested = new Counter();
		System.out.println(namTest.getMethodName());
	}

	@Test
	public void testCounter() {
		assertEquals(0, tested.getValue());
	}

	@Test
	public void testUp() {
		tested.up();
		assertEquals(1, tested.getValue());
	}
}