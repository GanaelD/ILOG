package fr.imtld.ilog;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.junit.runner.JUnitCore;

public class RunnerTest {
	@Rule
	public TestName namTest = new TestName();

	@Before
	public void setUp() throws Exception {
		System.out.println("setUp");
	}

	@After
	public void tearDown() throws Exception {
		System.out.println("tearDown");
	}

	@Test
	public void test1() {
		System.out.println(namTest.getMethodName());
	}

	@Test
	public void test2() {
		System.out.println(namTest.getMethodName());
	}
	
	/**
	 * This test case has a main so that it can be launched as a standalone
	 * application.
	 * 
	 * @param straArgs The command line arguments (unused).
	 */
	public static void main(String[] straArgs) {
		JUnitCore.main("fr.imtld.ilog.RunnerTest");
	}
}