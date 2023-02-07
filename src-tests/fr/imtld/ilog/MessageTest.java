package fr.imtld.ilog;

import org.junit.Test;
import org.junit.Assert;
import fr.imtld.ilog.Message;

public class MessageTest {
	
	@Test
	public void testMessage() {
		Message msg = new Message();
		String expected = "Hello World !";
		Assert.assertEquals(expected, msg.toString());
	}
}
