package tp_thread;

import java.util.concurrent.Executor;

public class FreshThreadExecutor implements Executor{

	@Override
	public void execute(Runnable r) {
		Thread thr = new Thread(r);
		thr.start();
	}

}
